import { Controller, Get, Param, Query } from '@nestjs/common'
import { Serialize } from '@src/interceptors/serialize.interceptor'

import { ValorantMatchService } from '@src/valorant-match/valorant-match.service'
import {
  ValorantMatchDetailDto,
  ValorantMatchPageDto,
} from '@src/valorant-match/dtos/valorant-match.dto'

@Controller('valorant-match')
export class ValorantMatchController {
  constructor(private readonly valorantMatchService: ValorantMatchService) {}

  @Get('timeline/:timelineId')
  @Serialize(ValorantMatchDetailDto)
  async getValorantMatchByTimelineId(@Param('timelineId') timelineId: string) {
    const result = await this.valorantMatchService.getValorantMatchByTimelineId(
      parseInt(timelineId),
    )

    return result
  }

  @Get('record')
  @Serialize(ValorantMatchPageDto)
  async getValorantMatchByQuery(
    @Query('page') page = '1',
    @Query('matchType') matchType = null,
  ) {
    const result = await this.valorantMatchService.getValorantMatchByQuery(
      parseInt(page),
      matchType,
    )

    return result
  }
}
