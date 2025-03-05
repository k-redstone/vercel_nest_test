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
} from '@nestjs/common'

import { StreamersService } from '@src/streamers/streamers.service'
import { CreateStreamerDto } from '@src/streamers/dtos/create-streamer.dto'
import { UpdateStreamerDto } from '@src/streamers/dtos/update-streamer.dto'

@Controller('streamer')
export class StreamersController {
  constructor(private readonly streamersService: StreamersService) {}

  @Post()
  async createStreamer(@Body() body: CreateStreamerDto) {
    return await this.streamersService.create(body)
  }

  @Patch('/:streamerId')
  @HttpCode(HttpStatus.OK)
  async updateStreamer(
    @Param('streamerId') streamerId: number,
    @Body() body: UpdateStreamerDto,
  ) {
    await this.streamersService.update(streamerId, body)
    return { message: '스트리머 정보가 업데이트되었습니다.' }
  }

  @Delete('/:streamerId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeStreamer(@Param('streamerId') streamerId: number) {
    await this.streamersService.remove(streamerId)
  }
}
