import {
  Entity,
  ManyToOne,
  JoinColumn,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Timeline } from '@src/timeline/timeline.entity'
import { Streamer } from '@src/streamers/streamer.entity'

@Entity()
export class Participation {
  @PrimaryGeneratedColumn()
  participationId: number

  @Column({ type: 'int', default: 0, nullable: false })
  playHour: number

  @ManyToOne(() => Streamer, (streamer) => streamer.participations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'streamerId' })
  streamerId: Streamer

  @ManyToOne(() => Timeline, (Timeline) => Timeline.participations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'timelineId' })
  timelineId: Timeline
}
