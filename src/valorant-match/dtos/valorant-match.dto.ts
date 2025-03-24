import { Expose, Exclude, Type } from 'class-transformer'
import {
  ValorantAgentUnion,
  ValorantMapUnion,
  ValorantTierUnion,
  TeamTypeUnion,
  MatchTypeUnion,
} from '@src/valorant-match/types/valorant-match'
import { ValorantMatchEntity } from '@src/valorant-match/entities/valorant-match.entitiy'
import { ValorantMatchPlayerEntity } from '@src/valorant-match/entities/valorant-match-player.entity'

// export class ValorantMatchCLS {
//   matchId: number
//   timelineId?: number
//   matchType: MatchTypeUnion
//   winningTeam: TeamTypeUnion
//   map: ValorantMapUnion
//   score: { blue: number; red: number }
//   date: Date
//   players: {
//     BLUE: ValorantMatchPlayerDto[]
//     RED: ValorantMatchPlayerDto[]
//   }

//   constructor(
//     match: ValorantMatchEntity,
//     players: ValorantMatchPlayerEntity[],
//   ) {
//     this.matchId = match.matchId
//     this.timelineId = match.timelineId
//     this.matchType = match.matchType
//     this.winningTeam = match.winningTeam
//     this.map = match.map
//     this.score = { blue: match.blueScore, red: match.redScore }
//     this.date = match.date

//     const bluePlayers = players.filter((player) => player.team === 'BLUE')
//     const redPlayers = players.filter((player) => player.team === 'RED')
//     this.players = {
//       BLUE: bluePlayers.map(this.mapPlayer),
//       RED: redPlayers.map(this.mapPlayer),
//     }
//   }

//   private mapPlayer(
//     this: void,
//     player: ValorantMatchPlayerEntity,
//   ): ValorantMatchPlayerDto {
//     return {
//       playerId: player.playerId,
//       matchId: player.matchId,
//       streamerId: player.streamerId,
//       team: player.team,
//       agent: player.agent,
//       tier: player.tier,
//       stats: {
//         avgCombatScore: player.avgCombatScore,
//         kills: player.kills,
//         deaths: player.deaths,
//         assists: player.assists,
//         efficiencyRating: player.efficiencyRating,
//         firstKill: player.firstKill,
//         plant: player.plant,
//         defuse: player.defuse,
//       },
//       streamer: {
//         streamerId: player.streamer?.streamerId,
//         nickname: player.streamer?.nickname,
//         profileImageUrl: player.streamer?.profileImageUrl,
//       },
//     }
//   }
// }

class ValorantMatchStreamerDto {
  @Expose()
  streamerId?: number
  @Expose()
  nickname?: string
  @Expose()
  profileImageUrl?: string
}

class ValorantMatchPlayerDto {
  @Exclude()
  playerId: number
  @Expose()
  matchId: number
  @Expose()
  streamerId?: number
  @Expose()
  team: TeamTypeUnion
  @Expose()
  agent: ValorantAgentUnion
  @Expose()
  tier: ValorantTierUnion
  @Expose()
  avgCombatScore: number
  @Expose()
  kills: number
  @Expose()
  deaths: number
  @Expose()
  assists: number
  @Expose()
  efficiencyRating: number
  @Expose()
  firstKill: number
  @Expose()
  plant: number
  @Expose()
  defuse: number

  // stats: {
  //   avgCombatScore: number
  //   kills: number
  //   deaths: number
  //   assists: number
  //   efficiencyRating: number
  //   firstKill: number
  //   plant: number
  //   defuse: number
  // }

  @Expose()
  @Type(() => ValorantMatchStreamerDto)
  streamer?: ValorantMatchStreamerDto
}

export class ValorantMatchDetailDto {
  @Expose()
  matchId: number

  @Expose()
  timelineId?: number

  @Expose()
  matchType: MatchTypeUnion

  @Expose()
  winningTeam: TeamTypeUnion

  @Expose()
  map: ValorantMapUnion

  @Expose()
  blueScore: number

  @Expose()
  redScore: number

  @Expose()
  date: Date

  @Expose()
  @Type(() => ValorantMatchPlayerDto)
  players: ValorantMatchPlayerDto
}
