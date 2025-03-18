import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common'
import { GetStreamersDto } from '@src/streamers/dtos/streamer.dto'
import { StreamersService } from '@src/streamers/streamers.service'
import { CreateStreamerDto } from '@src/streamers/dtos/create-streamer.dto'
import { UpdateStreamerDto } from '@src/streamers/dtos/update-streamer.dto'

import { DenyGuard } from '@src/guards/deny.guard'

@Controller('streamer')
export class StreamersController {
  constructor(private readonly streamersService: StreamersService) {}

  @UseGuards(DenyGuard)
  @Post()
  async createStreamer(@Body() body: CreateStreamerDto) {
    return await this.streamersService.create(body)
  }

  @UseGuards(DenyGuard)
  @Patch('/:streamerId')
  @HttpCode(HttpStatus.OK)
  async updateStreamer(
    @Param('streamerId') streamerId: number,
    @Body() body: UpdateStreamerDto,
  ) {
    await this.streamersService.update(streamerId, body)
    return { message: '스트리머 정보가 업데이트되었습니다.' }
  }

  @UseGuards(DenyGuard)
  @Delete('/:streamerId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeStreamer(@Param('streamerId') streamerId: number) {
    await this.streamersService.remove(streamerId)
  }

  @Get('/:streamerId')
  @HttpCode(HttpStatus.OK)
  async getStreamerProfile(@Param('streamerId') streamerId: number) {
    return await this.streamersService.getStreamerProfile(streamerId)
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getStreamersWithParticipationStats(@Query() query: GetStreamersDto) {
    return await this.streamersService.getStreamersWithParticipationStats(query)
  }
}
