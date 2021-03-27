<template>
  <div class="games-page">
    <top-bar>
      <template slot="main">
        <router-link :to="vueRoutes.assetsExplore">
          <span>{{ 'games-page.all-games' | globalize }}</span>
        </router-link>
        <router-link :to="vueRoutes.assetsExplore">
          <span>{{ 'games-page.my-games' | globalize }}</span>
        </router-link>
      </template>
      <template
        slot="extra"
        v-if="isAccountCorporate"
      >
        <button
          v-ripple
          class="assets-page__create-btn app__button-raised"
          @click="isAssetDrawerShown = true"
        >
          <i class="mdi mdi-plus assets-page__btn-icon" />
          <span>
            {{ 'assets-page.create-btn' | globalize }}
          </span>
        </button>
      </template>
    </top-bar>

    <template v-if="isAccountCorporate">
      <drawer :is-shown.sync="isAssetDrawerShown">
        <template slot="heading">
          {{ 'assets-page.create-asset-title' | globalize }}
        </template>
      </drawer>
    </template>
  </div>
</template>

<script>
import TopBar from '@/vue/common/TopBar'
import Drawer from '@/vue/common/Drawer'

import { vueRoutes } from '@/vue-router/routes'
import { mapGetters } from 'vuex'
import { vuexTypes } from '@/vuex'

export default {
  name: 'games-page',
  components: {
    TopBar,
    Drawer,
  },

  mixins: [],

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

  methods: {
  },
}
</script>
