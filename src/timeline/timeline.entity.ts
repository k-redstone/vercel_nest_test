import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm'

import { Participation } from '@src/timeline/participation.entity'

@Entity()
export class Timeline {
  @PrimaryGeneratedColumn()
  timelineId: number

  @Column({ length: 255, nullable: true })
  title: string

  @Column({ length: 255, nullable: true })
  description: string

  @Column({ nullable: false })
  date: Date

  @CreateDateColumn({ nullable: false })
  createdAt: Date

  @UpdateDateColumn({ nullable: false })
  updatedAt: Date

  @OneToMany(() => Participation, (participation) => participation.timelineId)
  participations: Participation[]
}
