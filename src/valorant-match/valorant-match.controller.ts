import { Controller, Get, Param } from '@nestjs/common'
import { Serialize } from '@src/interceptors/serialize.interceptor'

import { ValorantMatchService } from '@src/valorant-match/valorant-match.service'
import { ValorantMatchDetailDto } from '@src/valorant-match/dtos/valorant-match.dto'

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
}
