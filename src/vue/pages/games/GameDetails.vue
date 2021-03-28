<template>
  <div class="game-details">
    <iframe
      class="game-details__frame"
      :src="`https://www.youtube.com/embed/${youtubeId}`"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media;
          gyroscope; picture-in-picture"
      allowfullscreen
    />

    <div class="game-details__team">
      <h2 class="game-details__team-title">
        {{
          'game-details.team1-title' |
            globalize({ name: assetGame.team1.name })
        }}
      </h2>
      <h3 class="game-details__team-subtitle">
        {{ 'game-details.participants-subtitle' | globalize }}
      </h3>
      <div class="game-details__team-participants">
        <template v-for="(item1, id1) in assetGame.team1">
          <p
            v-if="id1 !== 'name'"
            :key="item1+id1"
            class="game-details__team-participant"
            :title="item1"
          >
            {{ item1 }}
          </p>
        </template>
      </div>
    </div>

    <div class="game-details__team">
      <h2 class="game-details__team-title">
        {{
          'game-details.team2-title' |
            globalize({ name: assetGame.team2.name })
        }}
      </h2>
      <h3 class="game-details__team-title">
        {{ 'game-details.participants-subtitle' | globalize }}
      </h3>
      <div class="game-details__team-participants">
        <template v-for="(item2, id2) in assetGame.team2">
          <p
            v-if="id2 !== 'name'"
            :key="item2+id2"
            class="game-details__team-participant"
            :title="item2"
          >
            {{ item2 }}
          </p>
        </template>
      </div>
    </div>

    <h2 class="game-details__team-title">
      Prise
    </h2>
    <span class="game-details__team-prise">
      {{ assetGame.issued | formatMoney }} USD
    </span>

    <template v-if="isAssetOwner && !isHaveWinner">
      <h2 class="game-details__team-title">
        Choose a winner
      </h2>

      <div class="game-details__actions">
        <button
          v-ripple
          type="button"
          @click="teamWinRequest(assetGame.team1.name)"
          class="app__button-raised create-poll-form__btn"
          :disabled="isButtonDisabled"
        >
          {{ assetGame.team1.name }}
        </button>

        <button
          v-ripple
          type="button"
          @click="teamWinRequest(assetGame.team1.name)"
          class="app__button-raised create-poll-form__btn"
          :disabled="isButtonDisabled"
        >
          {{ assetGame.team2.name }}
        </button>
      </div>
    </template>

    <div v-if="!isHaveWinner">
      <h2 class="game-details__team-title">
        Donate for winner
      </h2>

      <game-donat-form
        :game-coin-id="assetGame.code"
      />
    </div>

    <template>
      <h1 class="game-details__winner">
        Сongratulations! Winner: {{ winner }}
      </h1>
    </template>
  </div>
</template>

<script>

import { AssetGameRecord } from '@/js/records/entities/asset-game.record'
import { vuexTypes } from '@/vuex'
import { mapGetters } from 'vuex'
import GameDonatForm from '@/vue/pages/games/GameDonatForm'
import { api } from '@/api'
import { ErrorHandler } from '@/js/helpers/error-handler'

export default {
  name: 'asset-card',
  components: {
    GameDonatForm,
  },

  props: {
    assetGame: { type: AssetGameRecord, required: true },
  },

  data () {
    return {
      isButtonDisabled: false,
      isSelectWinner: '',
    }
  },

  computed: {
    ...mapGetters([
      vuexTypes.accountId,
    ]),

    youtubeId () {
      const inputtedValue = this.assetGame.streamLink
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|v=)([^#]*).*/
      const match = inputtedValue.match(regExp)
      return match ? match[2] : inputtedValue
    },

    isAssetOwner () {
      return this.assetGame.organizer === this.accountId
    },

    isHaveWinner () {
      return this.assetGame.winner || this.isSelectWinner
    },
  },

  methods: {
    async teamWinRequest (teamName) {
      this.isButtonDisabled = true
      try {
        const endpoint = '/integrations/game-service/winner'
        const params = {
          data: {
            attributes: {
              game_coin_id: this.assetGame.code,
              team_name: teamName,
            },
          },
        }
        await api.postWithSignature(endpoint, params)
        this.isSelectWinner = teamName
      } catch (e) {
        ErrorHandler.process(e)
      }
      this.isButtonDisabled = false
    },
  },

}
</script>
<style lang="scss" scoped>
.game-details__frame {
  max-width: 100%;
  width: 100%;
  height: 30rem;
}

.game-details__team {
  & + & {
    margin-top: 4rem;
  }
}

.game-details__team-title {
  margin: 2rem 0;
}

.game-details__team-participant {
  font-size: 1.6rem;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;

  & + & {
    margin-top: 0.4rem;
  }
}

.game-details__actions {
  display: flex;
  justify-content: space-between;
}

.game-details__team-prise {
  font-size: 1.8rem;
}

// .game-details__winner {
//   color: #0fa005;
// }

</style>
