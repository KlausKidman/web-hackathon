import { base } from '@tokend/js-sdk'

export const config = Object.freeze({
  MIN_AMOUNT: 0.01,
  MAX_AMOUNT: String(base.Operation.MAX_INT64_AMOUNT),
  DECIMAL_POINTS: 2,
  RELOAD_DATA_TICKER_INTERVAL_MS: 10000,

  DEFAULT_POINT_CODE: 'PET',
  DEFAULT_POINT_NAME: 'Pet shop bonuses',
  MERCHANT_NAME: 'Pets shop, Sumska 46',
  MERCHANT_ACCOUNT_ID: 'GAGNVDMHHL3UJEIKSYRLKILHGA7K6MKZS2KXQSWBRQ55XUB2YBSTRVDV',

  LOYALTY_ACCOUNTS: [
    {
      number: '49022635',
      system: 'https://api.flowers.tokend.io',
      accountId: 'GDSARB4GFT72EMH7WTPUZPHFEPPU3MLP5HBWFA5IDNSQ4TTIBDC6TXRV',
      secretSeed: 'SCYF7TYAPHNGRVQBYHGQR7QNC733RPMHXW64JXRFAHFUTJACCH6TA75V',
    },
    {
      number: '31962635',
      system: 'https://api.gasstation.tokend.io',
      accountId: 'GBSJHO5CGQ3TU4FONWWNXC7TFWRX5SKANXXRGBCQOCJW463BR4VHNFWS',
      secretSeed: 'SBOISN4L4PJOAKHREFNRLGQTMRDGPZTXGZHSK37ZEIYFKVU3SY34ACPZ',
    },
    {
      number: '27772635',
      system: 'https://api.petshop.tokend.io',
      accountId: 'GAI4EIE6ALCZLAT6MTIQVUSOSBPB73XWDXUPVZV46ZB2NQA4CBWTSMOG',
      secretSeed: 'SDQSYDALD2GW4R4MCSNPW4KXB246PNCM4ESNYXETUVU3JOXTTOL6TDDZ',
    },
  ],
})