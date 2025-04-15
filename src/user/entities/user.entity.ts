import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  userId: string

  @Column()
  password: string

  @Column({ default: false })
  isAdmin: boolean

  @Column({ type: 'varchar', nullable: true })
  refreshToken: string | null
}
