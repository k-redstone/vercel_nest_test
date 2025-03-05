import { Module } from '@nestjs/common'
import { StreamersService } from '@src/streamers/streamers.service'
import { StreamersController } from '@src/streamers/streamers.controller'

import { TypeOrmModule } from '@nestjs/typeorm'
import { Streamer } from '@src/streamers/streamer.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Streamer])],
  providers: [StreamersService],
  controllers: [StreamersController],
})
export class StreamersModule {}
