import { Injectable } from '@nestjs/common'

import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

import { Streamer } from '@src/streamers/streamer.entity'
import { CreateStreamerDto } from '@src/streamers/dtos/create-streamer.dto'

import { NotFoundException } from '@nestjs/common'
import { Timeline } from '@src/timeline/timeline.entity'
import {
  GetStreamersDto,
  StreamerWithStatsDto,
} from '@src/streamers/dtos/streamer.dto'

@Injectable()
export class StreamersService {
  constructor(
    @InjectRepository(Streamer) private repo: Repository<Streamer>,
    @InjectRepository(Timeline) private timelineRepo: Repository<Timeline>,
  ) {}

  findStreamerById(streamerId: number) {
    if (!streamerId) {
      return null
    }

    return this.repo.findOneBy({ streamerId })
  }

  create(body: CreateStreamerDto) {
    const streamer = this.repo.create(body)

    return this.repo.save(streamer)
  }

  async update(streamerId: number, attrs: Partial<Streamer>) {
    const streamer = await this.findStreamerById(streamerId)

    if (!streamer) {
      throw new NotFoundException('streamer not found')
    }

    Object.assign(streamer, attrs)

    return this.repo.save(streamer)
  }

  async remove(streamerId: number) {
    const streamer = await this.findStreamerById(streamerId)

    if (!streamer) {
      throw new NotFoundException('streamer not found')
    }

    return this.repo.remove(streamer)
  }

  async getStreamersWithParticipationStats(
    dto: GetStreamersDto,
  ): Promise<StreamerWithStatsDto[]> {
    const {
      nickname,
      sortField = 'totalParticipations',
      sortOrder = 'DESC',
    } = dto

    const totalGamesData = await this.timelineRepo.count()
    const totalGames = totalGamesData ?? 0

    const query = this.repo
      .createQueryBuilder('streamer')
      .select([
        'streamer.streamerId As streamerId',
        'streamer.nickname As nickname',
        'streamer.profileImageUrl As profileImageUrl',
        'streamer.hashId As hashId',
        'streamer.role As role',
        // 총 게임 참여 횟수
        'COUNT(DISTINCT participation.timelineId) AS totalParticipations',
        // 총 참여 시간
        'SUM(participation.playHour) AS totalParticipationTime',
      ])
      .leftJoin('streamer.participations', 'participation')
      .leftJoin('participation.timeline', 'timeline')
      .groupBy('streamer.streamerId')

    if (nickname) {
      query.andWhere('streamer.nickname LIKE :nickname', {
        nickname: `%${nickname}%`,
      })
    }

    const streamers: StreamerWithStatsDto[] = await query
      .orderBy(sortField, sortOrder)
      .getRawMany()

    // 계산된 비율 및 총 참여 시간 등 리턴
    return streamers.map((streamer) => ({
      ...streamer,
      totalParticipations: Number(streamer.totalParticipations) || 0,
      totalParticipationTime: Number(streamer.totalParticipationTime) || 0,
      participationRatio: totalGames
        ? streamer.totalParticipations / totalGames
        : 0,
    }))
  }
}
