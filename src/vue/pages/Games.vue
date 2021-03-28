<template>
  <div class="games-page">
    <top-bar>
      <template slot="main">
        <router-link :to="vueRoutes.gamesAll">
          <span>{{ 'games-page.all-games' | globalize }}</span>
        </router-link>
        <router-link
          v-if="isAccountCorporate"
          :to="vueRoutes.gamesMy"
        >
          <span>{{ 'games-page.my-games' | globalize }}</span>
        </router-link>
      </template>
      <template
        slot="extra"
        v-if="isAccountCorporate"
      >
        <button
          v-ripple
          class="app__button-raised"
          @click="isAssetDrawerShown = true"
        >
          <i class="mdi mdi-plus game-page__btn-icon" />
          <span>
            {{ 'games-page.create-btn' | globalize }}
          </span>
        </button>
      </template>
    </top-bar>

    <template v-if="isAccountCorporate">
      <drawer :is-shown.sync="isAssetDrawerShown">
        <template slot="heading">
          {{ 'games-page.create-game-title' | globalize }}
        </template>

        <create-game-form />
      </drawer>
    </template>

    <router-view />
  </div>
</template>

<script>
import TopBar from '@/vue/common/TopBar'
import Drawer from '@/vue/common/Drawer'
import CreateGameForm from '@/vue/forms/CreateGameForm'

import { vueRoutes } from '@/vue-router/routes'
import { mapGetters } from 'vuex'
import { vuexTypes } from '@/vuex'

export default {
  name: 'games-page',
  components: {
    TopBar,
    Drawer,
    CreateGameForm,
  },

  data () {
    return {
      isAssetDrawerShown: false,
      vueRoutes,
    }
  },

  computed: {
    ...mapGetters({
      isAccountCorporate: vuexTypes.isAccountCorporate,
    }),
  },
}
</script>
<style lang="scss" scoped>
.game-page__btn-icon {
  display: flex;
  font-size: 1.8rem;
  margin-right: 0.5rem;
  margin-top: -0.4rem;
}

</style>
