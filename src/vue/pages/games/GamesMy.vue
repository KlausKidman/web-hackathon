<template>
  <div class="games-my">
    <games-list :account-id="accountId" />
  </div>
</template>

<script>
import GamesList from '@/vue/pages/games/GamesList'

import { mapGetters } from 'vuex'
import { vuexTypes } from '@/vuex'

export default {
  name: 'games-my',
  components: {
    GamesList,
  },

  computed: {
    ...mapGetters([
      vuexTypes.accountId,
    ]),
  },
}
</script>
