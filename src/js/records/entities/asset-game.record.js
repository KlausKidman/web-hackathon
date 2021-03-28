import _get from 'lodash/get'
import { AssetRecord } from '@/js/records/entities/asset.record'

export class AssetGameRecord extends AssetRecord {
  constructor (record) {
    super(record)
    this.nameCompetition = _get(record, 'details.nameCompetition')
    this.assetCode = _get(record, 'details.assetCode')
    this.date = _get(record, 'details.date')
    this.sourceBalanceId = _get(record, 'details.sourceBalanceId')
    this.streamLink = _get(record, 'details.streamLink')

    this.team1 = {}
    this.team2 = {}

    this.team1.name = _get(record, 'details.team1.name')
    this.team1.playerEmail1 = _get(record, 'details.team1.player1')
    this.team1.playerEmail2 = _get(record, 'details.team1.player2')
    this.team1.playerEmail3 = _get(record, 'details.team1.player3')
    this.team1.playerEmail4 = _get(record, 'details.team1.player4')
    this.team1.playerEmail5 = _get(record, 'details.team1.player5')

    this.team2.name = _get(record, 'details.team1.name')
    this.team2.playerEmail1 = _get(record, 'details.team2.player1')
    this.team2.playerEmail2 = _get(record, 'details.team2.player2')
    this.team2.playerEmail3 = _get(record, 'details.team2.player3')
    this.team2.playerEmail4 = _get(record, 'details.team2.player4')
    this.team2.playerEmail5 = _get(record, 'details.team2.player5')
  }
}
