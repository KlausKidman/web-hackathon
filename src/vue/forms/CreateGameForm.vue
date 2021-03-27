<template>
  <form
    class="app-form create-game-form"
    @submit.prevent="isFormValid() && showConfirmation()"
  >
    <div class="app__form-row">
      <div class="app__form-field">
        <input-field
          v-model="form.name"
          name="create-game-form-name"
          @blur="touchField('form.name')"
          :label="'create-game-form.name-lbl' | globalize"
          :error-message="getFieldErrorMessage('form.name')"
          :white-autofill="false"
        />
      </div>
    </div>

    <div class="app__form-row">
      <div class="app__form-field">
        <select-field
          name="create-game-form-asset"
          :value="form.asset.code"
          @input="setAsset"
          :label="'create-game-form.asset-lbl' | globalize"
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
          name="create-game-form-amount"
          validation-type="outgoing"
          :label="'transfer-form.amount-lbl' | globalize"
          :asset="transferableBalancesAssets[0]"
          is-max-button-shown
          :readonly="formMixin.isDisabled"
          :disabled="!balance"
          min="0"
        />
      </div>
    </div>

    <div class="app__form-row">
      <div class="app__form-field">
        <input-field
          v-model="form.streamLink"
          name="create-game-form-name"
          @blur="touchField('form.name')"
          :label="'create-game-form.stream-link-lbl' | globalize"
          :error-message="getFieldErrorMessage('form.name')"
          :white-autofill="false"
        />
      </div>
    </div>

    <!-- team 1 -->
    <h2 class="create-game-form__team-title">
      {{ 'create-game-form.team-1-title' | globalize }}
    </h2>

    <div
      class="app__form-row"
      v-for="(item, key) in form.team1"
      :key="`team1-${key}`"
    >
      <div class="app__form-field">
        <template v-if="key === 'name'">
          <input-field
            v-model="form.team1[key]"
            :name="`create-game-form-${key}`"
            @blur="touchField(`form.team1.${key}`)"
            :label="`create-game-form.${key}-team-1-lbl` | globalize"
            :error-message="getFieldErrorMessage(`form.name.${key}`)"
            :white-autofill="false"
          />
        </template>
        <template v-else>
          <input-field
            v-model="form.team1[key]"
            :name="`create-game-form-team1-${key}`"
            @blur="touchField(`form.team1.${key}`)"
            :label="`create-game-form.${key}-lbl` | globalize"
            :error-message="getFieldErrorMessage(`form.team1.${key}`)"
            :white-autofill="false"
          />
        </template>
      </div>
    </div>

    <!-- team 2 -->
    <h2 class="create-game-form__team-title">
      {{ 'create-game-form.team-2-title' | globalize }}
    </h2>

    <div
      class="app__form-row"
      v-for="(item, key) in form.team2"
      :key="`team2-${key}`"
    >
      <div class="app__form-field">
        <template v-if="key === 'name'">
          <input-field
            v-model="form.team2[key]"
            :name="`create-game-form-${key}`"
            @blur="touchField(`form.team2.${key}`)"
            :label="`create-game-form.${key}-team-2-lbl` | globalize"
            :error-message="getFieldErrorMessage(`form.name.${key}`)"
            :white-autofill="false"
          />
        </template>
        <template v-else>
          <input-field
            v-model="form.team2[key]"
            :name="`create-game-form-team2-${key}`"
            @blur="touchField(`form.team2.${key}`)"
            :label="`create-game-form.${key}-lbl` | globalize"
            :error-message="getFieldErrorMessage(`form.team2.${key}`)"
            :white-autofill="false"
          />
        </template>
      </div>
    </div>

    <div class="app__form-actions">
      <button
        v-ripple
        type="submit"
        class="auth-form__submit-btn app__button-raised"
        :disabled="formMixin.isDisabled"
      >
        {{ 'create-game-form.create-btn' | globalize }}
      </button>
    </div>
  </form>
</template>

<script>
import FormMixin from '@/vue/mixins/form.mixin'

import { vuexTypes } from '@/vuex'
import { mapActions, mapGetters } from 'vuex'

import { MAX_FIELD_LENGTH } from '@/js/const/field-length.const'

export default {
  name: 'create-game-form',
  mixins: [FormMixin],
  data: _ => ({
    // ownerID
    form: {
      name: '',
      amount: 0,
      asset: {},
      assetCode: '',
      sourceBalanceId: '',
      streamLink: '',
      team1: {
        name: '',
        player1: '',
        player2: '',
        player3: '',
        player4: '',
        player5: '',
      },
      team2: {
        name: '',
        player1: '',
        player2: '',
        player3: '',
        player4: '',
        player5: '',
      },

    },
    MAX_FIELD_LENGTH,
  }),
  computed: {
    ...mapGetters([
      vuexTypes.transferableBalancesAssets,
      vuexTypes.accountBalances,
      vuexTypes.accountBalanceByCode,
    ]),
    balance () {
      return +this.accountBalanceByCode(this.form.asset.code).balance
    },
  },

  created () {
    this.form.asset = this.transferableBalancesAssets[0]
  },

  methods: {
    ...mapActions({
      loadCurrentBalances: vuexTypes.LOAD_ACCOUNT_BALANCES_DETAILS,
    }),

    submit () {

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
.create-game-form__team-title {
  margin-top: 4rem;
}
</style>
