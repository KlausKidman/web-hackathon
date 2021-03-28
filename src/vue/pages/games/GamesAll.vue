<template>
  <div class="games-all">
    <games-list />
  </div>
</template>

<script>

import GamesList from '@/vue/pages/games/GamesList'

export default {
  name: 'games-all',
  components: {
    GamesList,
  },
}
</script>
