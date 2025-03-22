import { IsString, IsDateString, IsArray, IsObject } from 'class-validator'

class ChangelogItemDto {
  @IsDateString()
  date: string

  @IsString()
  type: string

  @IsString()
  description: string
}

class ChangelogDateGroupedDto {
  @IsDateString()
  date: string

  @IsArray()
  @IsObject({ each: true })
  changes: ChangelogItemDto[]
}

export { ChangelogItemDto, ChangelogDateGroupedDto }
