import { IsString, IsOptional } from 'class-validator'

export class UpdateStreamerDto {
  @IsString()
  @IsOptional()
  hashId: string

  @IsString()
  @IsOptional()
  nickname: string

  @IsString()
  @IsOptional()
  role: string

  @IsString()
  @IsOptional()
  profileImageUrl: string
}
