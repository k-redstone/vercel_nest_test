import { Module } from '@nestjs/common'
import { TimelineController } from '@src/timeline/timeline.controller'
import { TimelineService } from '@src/timeline/timeline.service'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Timeline } from '@src/timeline/timeline.entity'
import { Participation } from '@src/timeline/participation.entity'
import { Streamer } from '@src/streamers/streamer.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Timeline, Participation, Streamer])],
  controllers: [TimelineController],
  providers: [TimelineService],
})
export class TimelineModule {}
