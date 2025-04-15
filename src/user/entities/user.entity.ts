import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  userId: string

  @Column()
  password: string

  @Column({ default: false })
  isAdmin: boolean

  @Column({ nullable: true })
  refreshToken: string
}
