import { Module, forwardRef } from '@nestjs/common'
import { StreamersService } from '@src/streamers/streamers.service'
import { StreamersController } from '@src/streamers/streamers.controller'

import { TypeOrmModule } from '@nestjs/typeorm'
import { Streamer } from '@src/streamers/streamer.entity'
import { Timeline } from '@src/timeline/timeline.entity'
import { Participation } from '@src/timeline/participation.entity'
import { TimelineModule } from '@src/timeline/timeline.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Streamer, Timeline, Participation]),
    forwardRef(() => TimelineModule),
  ],
  exports: [StreamersService],
  providers: [StreamersService],
  controllers: [StreamersController],
})
export class StreamersModule {}
