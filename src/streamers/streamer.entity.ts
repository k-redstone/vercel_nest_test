import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm'
import { Participation } from '@src/timeline/participation.entity'
@Entity()
export class Streamer {
  @PrimaryGeneratedColumn()
  streamerId: number

  @Column('text', { nullable: false })
  hashId: string

  @Column({ length: 20, nullable: false })
  nickname: string

  @Column({ default: 'member', length: 20, nullable: false })
  role: string

  @Column('text', { nullable: false })
  profileImageUrl: string

  @CreateDateColumn({ nullable: false })
  createdAt: Date

  @UpdateDateColumn({ nullable: false })
  updatedAt: Date

  @OneToMany(() => Participation, (participation) => participation.streamer)
  participations: Participation[]
}
