import { Injectable } from '@nestjs/common'

import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { ValorantMatchEntity } from '@src/valorant-match/entities/valorant-match.entitiy'
import { ValorantMatchPlayerEntity } from '@src/valorant-match/entities/valorant-match-player.entity'

@Injectable()
export class ValorantMatchService {
  constructor(
    @InjectRepository(ValorantMatchEntity)
    private readonly valorantMatchRepo: Repository<ValorantMatchEntity>,
    @InjectRepository(ValorantMatchPlayerEntity)
    private readonly valorantMatchPlayerRepo: Repository<ValorantMatchPlayerEntity>,
  ) {}

  async getMatchByTimelineId(timelineId: number) {
    return await this.valorantMatchRepo.findOneBy({ timelineId })
  }

  async getPlayersByMatchId(matchId: number) {
    const result = await this.valorantMatchPlayerRepo
      .createQueryBuilder('valorant_match_player')
      .leftJoinAndSelect('valorant_match_player.streamer', 'streamer')
      .getMany()

    return result
  }

  async getValorantMatchByTimelineId(timelineId: number) {
    const match = await this.valorantMatchRepo
      .createQueryBuilder('valorant_match')
      .leftJoinAndSelect('valorant_match.players', 'valorant_match_player')
      .leftJoinAndSelect('valorant_match_player.streamer', 'streamer')
      .where('valorant_match.timelineId = :timelineId', { timelineId })
      .getMany()

    return match
  }
}
