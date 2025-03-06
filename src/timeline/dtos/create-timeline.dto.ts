import {
  IsString,
  IsOptional,
  IsDateString,
  IsArray,
  IsNotEmpty,
  ValidateNested,
  IsInt,
} from 'class-validator'

import { Type } from 'class-transformer'

class ParticipantDto {
  @IsNotEmpty()
  streamerId: number

  @IsInt()
  playHour: number
}

export class CreateTimelineDto {
  @IsOptional()
  @IsString()
  title: string

  @IsOptional()
  @IsString()
  description: string

  @IsDateString()
  date: Date

  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ParticipantDto)
  participants: ParticipantDto[]
}
