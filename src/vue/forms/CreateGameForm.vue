<template>
  <form
    novalidate
    class="app-form create-game-form"
    @submit.prevent="submit"
  >
    <div class="app__form-row">
      <div class="app__form-field">
        <input-field
          name="create-game-form-name-competition"
          @blur="touchField('form.nameCompetition')"
          v-model="form.nameCompetition"
          :label="'create-game-form.name-lbl' | globalize"
          :error-message="getFieldErrorMessage('form.nameCompetition')"
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
          :label="'create-game-form.amount-lbl' | globalize"
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
        <date-field
          v-model="form.date"
          :enable-time="true"
          @input="touchField('form.date')"
          @blur="touchField('form.date')"
          name="create-game-form-date"
          :label="'create-game-form.date-lbl' | globalize"
          :disabled="formMixin.isDisabled"
        />
      </div>
    </div>

    <div class="app__form-row">
      <div class="app__form-field">
        <input-field
          v-model="form.streamLink"
          name="create-game-form-stream-link"
          @blur="touchField('form.streamLink')"
          :label="'create-game-form.stream-link-lbl' | globalize"
          :error-message="getFieldErrorMessage('form.streamLink')"
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
      v-for="(item1, key1) in form.team1"
      :key="`team1-${key1}`"
    >
      <div class="app__form-field">
        <template v-if="key1 === 'name'">
          <input-field
            v-model="form.team1[key1]"
            :name="`create-game-form-team1-${key1}`"
            @blur="touchField(`form.team1[${key1}]`)"
            :label="`create-game-form.${key1}-team-1-lbl` | globalize"
            :error-message="getFieldErrorMessage(`form.team1[${key1}]`)"
            :white-autofill="false"
          />
        </template>
        <template v-else>
          <input-field
            v-model="form.team1[key1]"
            :name="`create-game-form-team1-${key1}`"
            @blur="touchField(`form.team1[${key1}]`)"
            :label="`create-game-form.${key1}-lbl` | globalize"
            :error-message="getFieldErrorMessage(`form.team1[${key1}]`)"
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
      v-for="(item2, key2) in form.team2"
      :key="`team2-${key2}`"
    >
      <div class="app__form-field">
        <template v-if="key2 === 'name'">
          <input-field
            v-model="form.team2[key2]"
            :name="`create-game-form-team2-${key2}`"
            @blur="touchField(`form.team2[${key2}]`)"
            :label="`create-game-form.${key2}-team-2-lbl` | globalize"
            :error-message="getFieldErrorMessage(`form.team2[${key2}]`)"
            :white-autofill="false"
          />
        </template>
        <template v-else>
          <input-field
            v-model="form.team2[key2]"
            :name="`create-game-form-team2-${key2}`"
            @blur="touchField(`form.team2[${key2}]`)"
            :label="`create-game-form.${key2}-lbl` | globalize"
            :error-message="getFieldErrorMessage(`form.team2[${key2}]`)"
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
import { api } from '@/api'
import { ErrorHandler } from '@/js/helpers/error-handler'

import { vuexTypes } from '@/vuex'
import { mapActions, mapGetters } from 'vuex'

import { MAX_FIELD_LENGTH } from '@/js/const/field-length.const'

export default {
  name: 'create-game-form',
  mixins: [FormMixin],
  data: _ => ({
    form: {
      nameCompetition: '',
      amount: 0,
      asset: {},
      assetCode: '',
      sourceBalanceId: '',
      streamLink: '',
      date: '',
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
        const endpoint = '/integrations/game-service/create_game'
        const params = {
          data: {
            attributes: {
              owner_id: this.accountId,
              name_competition: this.form.nameCompetition,
              amount: this.form.amount,
              asset_code: this.form.assetCode,
              source_balance_id: this.form.sourceBalanceId,
              stream_link: this.form.streamLink,
              date: this.form.date,
              team1: {
                name: this.form.team1.name,
                player1: this.form.team1.player1,
                player2: this.form.team1.player2,
                player3: this.form.team1.player3,
                player4: this.form.team1.player4,
                player5: this.form.team1.player5,
              },
              team2: {
                name: this.form.team2.name,
                player1: this.form.team2.player1,
                player2: this.form.team2.player2,
                player3: this.form.team2.player3,
                player4: this.form.team2.player4,
                player5: this.form.team2.player5,
              },
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
.create-game-form__team-title {
  margin-top: 4rem;
}
</style>
