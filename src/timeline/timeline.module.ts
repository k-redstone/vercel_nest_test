import { Module } from '@nestjs/common'
import { TimelineController } from '@src/timeline/timeline.controller'
import { TimelineService } from '@src/timeline/timeline.service'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Timeline } from '@src/timeline/timeline.entity'
import { Participation } from '@src/timeline/participation.entity'

import { StreamersModule } from '@src/streamers/streamers.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Timeline, Participation]),
    StreamersModule,
  ],
  exports: [TimelineService],
  controllers: [TimelineController],
  providers: [TimelineService],
})
export class TimelineModule {}
