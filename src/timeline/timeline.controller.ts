import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common'

import { TimelineService } from '@src/timeline/timeline.service'

import { CreateTimelineDto } from '@src/timeline/dtos/create-timeline.dto'

@Controller('timeline')
export class TimelineController {
  constructor(private readonly timelineService: TimelineService) {}

  // 타임라인 전체 조회(페이지네이션)
  @Get()
  getTimelineAll() {}

  // 타임라인 단일 조회()
  @Get()
  getTimelineById() {}

  // 타임라인 생성
  @Post()
  async createTimeline(@Body() body: CreateTimelineDto) {
    await this.timelineService.createTimeline(body)
  }

  // 타임라인 날짜 전체 조회(달력에 사용할)
  @Get()
  getTimelineByDate() {}
}
