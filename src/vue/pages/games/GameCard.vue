<template>
  <div class="game-card">
    <card>
      <template slot="media">
        <img
          class="game-card__image"
          slot="media"
          src="@static/cs_baner.png"
        >
      </template>

      <template slot="header">
        <span>{{ asset.team1.name }}</span>
        vs
        <span>{{ asset.team2.name }}</span>
      </template>
      <template slot="actions">
        <button
          v-ripple
          class="app__button-flat"
          @click="showDetails"
        >
          {{ 'game-card.details-lbl' | globalize }}
        </button>
      </template>
    </card>

    <drawer :is-shown.sync="isDrawerShown">
      <template slot="heading">
        {{ 'game-card.details-game-title' | globalize }}
      </template>
      <game-details
        :asset-game="asset"
      />
    </drawer>
  </div>
</template>

<script>
import Card from '@/vue/common/Card'
import Drawer from '@/vue/common/Drawer'
import GameDetails from '@/vue/pages/games/GameDetails'

import { AssetGameRecord } from '@/js/records/entities/asset-game.record'

export default {
  name: 'game-card',
  components: {
    Card,
    Drawer,
    GameDetails,
  },

  props: {
    asset: { type: AssetGameRecord, required: true },
  },

  data: _ => ({
    isDrawerShown: false,
  }),

  methods: {
    showDetails () {
      this.isDrawerShown = true
    },
  },
}
</script>
<style lang="scss" scoped>
.game-card__image {
  width: 100%;
}

</style>
