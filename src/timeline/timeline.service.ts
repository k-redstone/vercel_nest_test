import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'
import { Repository } from 'typeorm'

import { InjectRepository } from '@nestjs/typeorm'

import { Timeline } from '@src/timeline/timeline.entity'
// import { Streamer } from '@src/streamers/streamer.entity'

import {
  CreateTimelineDto,
  ParticipantDto,
} from '@src/timeline/dtos/create-timeline.dto'
import { Participation } from '@src/timeline/participation.entity'
import { StreamersService } from '@src/streamers/streamers.service'

@Injectable()
export class TimelineService {
  constructor(
    @InjectRepository(Timeline) private timelineRepo: Repository<Timeline>,
    // @InjectRepository(Streamer) private streamerRepo: Repository<Streamer>,
    @InjectRepository(Participation)
    private participationRepo: Repository<Participation>,
    private readonly streamersService: StreamersService,
  ) {}

  async getTimelineById(timelineId: number) {
    if (!timelineId) return null

    return this.timelineRepo.findOneBy({ timelineId })
  }

  async getTimelineWithParticipants(timelineId: number) {
    if (!timelineId) return null

    return this.timelineRepo.findOne({
      where: { timelineId },
      relations: ['participations', 'participations.streamer'],
    })
  }

  async createTimeline(createTimelineDto: CreateTimelineDto) {
    try {
      const participants = createTimelineDto.participants

      // 스트리머 존재 확인
      for (const participantDto of participants) {
        const streamer = await this.streamersService.findStreamerById(
          participantDto.streamerId,
        )

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
          streamer: { streamerId: participantDto.streamerId },
          timeline: { timelineId: savedTimeline.timelineId },
          playHour: participantDto.playHour,
        })
      })

      // 저장
      await this.participationRepo.save(participations)
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async updateTimeline(
    timelineId: number,
    updateTimeLineDto: Partial<Timeline>,
    participants: ParticipantDto[],
  ) {
    try {
      const timeline = await this.getTimelineById(timelineId)

      if (!timeline) {
        throw new NotFoundException('timeline not found')
      }

      // 타임라인 업데이트
      Object.assign(timeline, updateTimeLineDto)
      await this.timelineRepo.save(timeline)

      const existingParticipations = await this.participationRepo.find({
        where: { timeline: timelineId === timelineId },
        relations: {
          streamer: true,
        },
      })

      const newParticipationEntities: Participation[] = []

      for (const participant of participants) {
        const existingParticipation = existingParticipations.find(
          (p) => p.streamer.streamerId === participant.streamerId,
        )
        // 이미 존재한다면 업데이트
        if (existingParticipation) {
          existingParticipation.playHour = participant.playHour
          await this.participationRepo.save(existingParticipation)
        } else {
          // 없다면 추가
          const streamer = await this.streamersService.findStreamerById(
            participant.streamerId,
          )

          if (!streamer) throw new NotFoundException('streamer not found')

          const participation = this.participationRepo.create({
            streamer: { streamerId: streamer.streamerId },
            timeline: { timelineId },
            playHour: participant.playHour,
          })

          newParticipationEntities.push(participation)
        }
      }

      // 제거할 스트리머 필터링
      const participationToRemove = existingParticipations.filter(
        (p) =>
          !participants.some((np) => np.streamerId === p.streamer.streamerId),
      )

      // 스트리머 삭제
      if (participationToRemove.length > 0) {
        await this.participationRepo.remove(participationToRemove)
      }

      // 스트리머 추가
      if (newParticipationEntities.length > 0) {
        await this.participationRepo.save(newParticipationEntities)
      }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
}
