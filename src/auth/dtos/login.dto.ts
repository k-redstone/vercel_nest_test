import { Expose } from 'class-transformer'
import { IsString } from 'class-validator'

export class LoginDto {
  @Expose()
  @IsString()
  userId: string

  @Expose()
  @IsString()
  password: string
}
