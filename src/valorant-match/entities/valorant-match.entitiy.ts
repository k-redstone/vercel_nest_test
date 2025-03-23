import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm'

import {
  teamTypeKeys,
  matchTypeKeys,
  MatchTypeUnion,
  TeamTypeUnion,
} from '@src/valorant-match/types/valorant-match'

@Entity('valorant-match')
export class ValorantMatchEntity {
  @PrimaryGeneratedColumn()
  matchId: number

  @Column({ type: 'integer', nullable: true })
  timelineId?: number

  @Column({ type: 'enum', enum: Object.values(matchTypeKeys), nullable: false })
  matchType: MatchTypeUnion

  @Column({ type: 'enum', enum: Object.values(teamTypeKeys), nullable: false })
  winningTeam: TeamTypeUnion

  @Column({ type: 'integer', default: 0 })
  blueScore: number

  @Column({ type: 'integer', default: 0 })
  redScore: number

  @Column({ nullable: false })
  date: Date

  @CreateDateColumn({ nullable: false })
  createdAt: Date

  @UpdateDateColumn({ nullable: false })
  updatedAt: Date
}
