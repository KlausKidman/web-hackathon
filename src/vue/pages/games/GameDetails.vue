<template>
  <div class="game-details">
    <iframe
      class="game-details__frame"
      src="https://www.youtube.com/embed/36YnV9STBqc"
      title="YouTube video player"
      frameborder="0"
      allow="
        accelerometer;
        autoplay;
        clipboard-write;
        encrypted-media;
        gyroscope;
        picture-in-picture
      "
      allowfullscreen
    />

    <div class="game-details__team">
      <h2 class="game-details__team-title">
        {{
          'game-details.team1-title' |
            globalize({ name: assetGame.nameCompetition })
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
            globalize({ name: assetGame.nameCompetition })
        }}
      </h2>
      <h3 class="game-details__team-subtitle">
        {{ 'game-details.participants-subtitle' | globalize }}
      </h3>
      <div class="game-details__team-participants">
        <template v-for="(item2, id2) in assetGame.team2">
          <p
            v-if="id2 !== 'name'"
            :key="item2+id2"
            class="game-details__team-participant"
          >
            {{ item2 }}
          </p>
        </template>
      </div>
    </div>
  </div>
</template>

<script>

import { AssetGameRecord } from '@/js/records/entities/asset-game.record'

export default {
  name: 'asset-card',
  components: {
  },

  props: {
    assetGame: { type: AssetGameRecord, required: true },
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

.game-details__team-subtitle {
  margin: 2rem 0;
}

</style>
