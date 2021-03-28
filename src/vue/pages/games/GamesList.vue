<template>
  <div class="games-list">
    <template v-if="isLoaded">
      <template v-if="isLoadFailed">
        <p class="games-list__error-msg">
          {{ 'games-list.loading-error-msg' | globalize }}
        </p>
      </template>
      <template v-else>
        <template v-if="games.length">
          <div class="games-list__card-list">
            <template v-for="item in games">
              <game-card
                :asset="item"
                @update-list="updateAssetsList"
                :key="item.id"
              />
            </template>
          </div>
        </template>
        <template v-else>
          <no-data-message
            icon-name="trending-up"
            :title="'games-list.no-games-title' | globalize"
            :message="'games-list.no-games-msg' | globalize"
          />
        </template>
      </template>
    </template>
    <template v-else>
      <skeleton-cards-loader />
    </template>
  </div>
</template>

<script>
import NoDataMessage from '@/vue/common/NoDataMessage'
import UpdateList from '@/vue/mixins/update-list.mixin'
import SkeletonCardsLoader from '@/vue/common/skeleton-loader/SkeletonCardsLoader'
import GameCard from '@/vue/pages/games/GameCard'

import { AssetGameRecord } from '@/js/records/entities/asset-game.record'
import { api } from '@/api'

import { ErrorHandler } from '@/js/helpers/error-handler'

export default {
  name: 'games-list',
  components: {
    NoDataMessage,
    SkeletonCardsLoader,
    GameCard,
  },

  mixins: [UpdateList],

  props: {
    accountId: { type: String, default: '' },
  },

  data: _ => ({
    isLoaded: false,
    isLoadFailed: false,
    games: [],
  }),

  async created () {
    await this.loadGames()
  },

  beforeDestroy () {
    this.resetUpdateListEvent('assets:updateList')
  },

  methods: {
    async loadGames () {
      try {
        const { data } = await api.getWithSignature('/v3/assets', {
          page: { limit: 20 },
          filter: {
            types: 3,
          },
        })
        this.games = data.map(item => new AssetGameRecord(item))
        if (this.accountId) {
          this.games =
            this.games.filter(item => item.organizer === this.accountId)
        }
      } catch (e) {
        this.isLoadFailed = true
        ErrorHandler.processWithoutFeedback()
      }
      this.isLoaded = true
    },

    updateAssetsList () {
      this.loadGames()
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~@/scss/variables';

.games-list__card-list {
  display: grid;
  grid-gap: $card-list-grid-gap;
  grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
}
</style>
