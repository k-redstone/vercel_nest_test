import { Module } from '@nestjs/common'
import { ChangelogsController } from '@src/changelogs/changelogs.controller'
import { ChangelogsService } from '@src/changelogs/changelogs.service'

import { TypeOrmModule } from '@nestjs/typeorm'

import { ChangelogEntity } from '@src/changelogs/entities/changelog.entity'

@Module({
  imports: [TypeOrmModule.forFeature([ChangelogEntity])],
  controllers: [ChangelogsController],
  providers: [ChangelogsService],
})
export class ChangelogsModule {}
