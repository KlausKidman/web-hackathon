<template>
  <form
    novalidate
    class="app-form game-donat-form"
    @submit.prevent="submit"
  >
    <div class="app__form-row">
      <div class="app__form-field">
        <select-field
          name="game-donat-form-asset"
          :value="form.asset.code"
          @input="setAsset"
          :label="'game-donat-form.asset-lbl' | globalize"
          :readonly="formMixin.isDisabled"
        >
          <option
            v-for="asset in transferableBalancesAssets"
            :key="asset.code"
            :value="asset.code"
          >
            {{ asset.nameAndCode }}
          </option>
        </select-field>
      </div>
    </div>

    <div class="app__form-row">
      <div class="app__form-field">
        <amount-input-field
          v-model="form.amount"
          name="game-donat-form-amount"
          validation-type="outgoing"
          :label="'game-donat-form.amount-lbl' | globalize"
          :asset="transferableBalancesAssets[0]"
          is-max-button-shown
          :readonly="formMixin.isDisabled"
          :disabled="!balance"
          min="0"
        />
      </div>
    </div>

    <div class="app__form-actions">
      <button
        v-ripple
        type="submit"
        class="auth-form__submit-btn app__button-raised"
        :disabled="formMixin.isDisabled"
      >
        {{ 'game-donat-form.create-btn' | globalize }}
      </button>
    </div>
  </form>
</template>

<script>
import FormMixin from '@/vue/mixins/form.mixin'
import { api } from '@/api'
import { ErrorHandler } from '@/js/helpers/error-handler'

import { vuexTypes } from '@/vuex'
import { mapActions, mapGetters } from 'vuex'

import { MAX_FIELD_LENGTH } from '@/js/const/field-length.const'

export default {
  name: 'game-donat-form',
  mixins: [FormMixin],
  props: {
    gameCoinId: { type: String, required: true },
  },
  data: _ => ({
    form: {
      amount: 0,
      asset: {},
      assetCode: '',
      sourceBalanceId: '',
    },
    MAX_FIELD_LENGTH,
  }),

  computed: {
    ...mapGetters([
      vuexTypes.transferableBalancesAssets,
      vuexTypes.accountBalances,
      vuexTypes.accountBalanceByCode,
      vuexTypes.accountId,
    ]),
    balance () {
      return +this.accountBalanceByCode(this.form.asset.code).balance
    },
  },

  created () {
    this.form.asset = this.transferableBalancesAssets[0]
    this.setAsset()
  },

  methods: {
    ...mapActions({
      loadCurrentBalances: vuexTypes.LOAD_ACCOUNT_BALANCES_DETAILS,
    }),

    async submit () {
      if (!await this.isFormValid()) return
      this.disableForm()
      try {
        const endpoint = '/integrations/game-service/pay_game'
        const params = {
          data: {
            attributes: {
              owner_id: this.accountId,
              amount: this.form.amount,
              source_balance_id: this.form.sourceBalanceId,
              game_coin_id: this.gameCoinId,
            },
          },
        }
        await api.postWithSignature(endpoint, params)
      } catch (e) {
        ErrorHandler.process(e)
      }
      this.enableForm()
    },

    setAsset (payload) {
      const assetCode = payload
      this.form.asset = this.transferableBalancesAssets
        .find(asset => asset.code === assetCode) ||
        this.transferableBalancesAssets[0] ||
        {}
      this.form.assetCode = this.form.asset.code
      this.form.sourceBalanceId =
        this.accountBalanceByCode(this.form.asset.code).id
    },
  },
}
</script>

<style lang="scss" scoped>
.game-donat-form__team-title {
  margin-top: 4rem;
}
</style>
