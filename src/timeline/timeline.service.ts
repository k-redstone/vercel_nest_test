import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'
import { Repository, DataSource } from 'typeorm'

import { InjectRepository } from '@nestjs/typeorm'

import { Timeline } from '@src/timeline/timeline.entity'
import { Streamer } from '@src/streamers/streamer.entity'
import { Transactional } from '@src/interceptors/transaction.interceptor'
import { CreateTimelineDto } from '@src/timeline/dtos/create-timeline.dto'
import { Participation } from '@src/timeline/participation.entity'

@Injectable()
export class TimelineService {
  constructor(
    @InjectRepository(Timeline) private timelineRepo: Repository<Timeline>,
    @InjectRepository(Streamer) private streamerRepo: Repository<Streamer>,
    @InjectRepository(Participation)
    private participationRepo: Repository<Participation>,
  ) {}

  @Transactional()
  async createTimeline(createTimelineDto: CreateTimelineDto) {
    try {
      const participants = createTimelineDto.participants

      // 스트리머 존재 확인
      for (const participantDto of participants) {
        const streamer = await this.streamerRepo.findOneBy({
          streamerId: participantDto.streamerId,
        })

        if (!streamer) {
          throw new NotFoundException(
            `Streamer with ID ${participantDto.streamerId} not found`,
          )
        }
      }

      // 타임라인 생성
      const timeline = this.timelineRepo.create(createTimelineDto)
      const savedTimeline = await this.timelineRepo.save(timeline)

      // 스트리머 추가
      const participations = participants.map((participantDto) => {
        console.log(participantDto)
        return this.participationRepo.create({
          streamerId: { streamerId: participantDto.streamerId },
          timelineId: { timelineId: savedTimeline.timelineId },
          playHour: participantDto.playHour,
        })
      })

      // 저장
      await this.participationRepo.save(participations)
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
}
