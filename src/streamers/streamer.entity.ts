import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm'

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
}
