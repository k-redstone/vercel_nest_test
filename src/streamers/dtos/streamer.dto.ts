import { IsOptional, IsEnum, IsString, IsInt, Min, Max } from 'class-validator'

export class StreamerDto {
  streamerId: number
  nickname: string
  profileImageUrl: string
  hashId: string
  role: string
}

export class StreamerStatsDto {
  totalParticipations: number
  totalParticipationTime: number
  participationRatio: number
}

export class StreamerWithStatsDto extends StreamerDto {
  totalGames: number
  totalParticipations: number
  totalParticipationTime: number
  participationRatio: number
}

export class GetStreamersDto {
  @IsOptional()
  @IsString()
  nickname?: string // 닉네임 검색

  @IsOptional()
  @IsEnum([
    'nickname',
    'totalParticipations',
    'totalParticipationTime',
    'participationRatio',
  ])
  sortField?:
    | 'nickname'
    | 'totalParticipations'
    | 'totalParticipationTime'
    | 'participationRatio' // 정렬 필드

  @IsOptional()
  @IsEnum(['ASC', 'DESC'])
  sortOrder?: 'ASC' | 'DESC' // 정렬 방향
}
