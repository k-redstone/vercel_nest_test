import { Injectable } from '@nestjs/common'

import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

import { ChangelogEntity } from '@src/changelogs/entities/changelog.entity'

import {
  ChangelogDateGroupedDto,
  ChangelogItemDto,
} from '@src/changelogs/dtos/get-changelog.dto'

import { groupByDate } from '@src/lib'
@Injectable()
export class ChangelogsService {
  constructor(
    @InjectRepository(ChangelogEntity)
    private changelogRepo: Repository<ChangelogEntity>,
  ) {}

  async getRecentChangelog(): Promise<ChangelogDateGroupedDto[]> {
    const recentChangelog: ChangelogItemDto[] = await this.changelogRepo
      .createQueryBuilder('changelog')
      .select(['date', 'type', 'description'])
      .orderBy('changelog.date', 'DESC')
      .limit(10)
      .getRawMany()

    return groupByDate(recentChangelog)
  }

  async getAllChangelog(): Promise<ChangelogDateGroupedDto[]> {
    const allChangelog: ChangelogItemDto[] = await this.changelogRepo
      .createQueryBuilder('changelog')
      .select(['date', 'type', 'description'])
      .orderBy('changelog.date', 'DESC')
      .getRawMany()

    return groupByDate(allChangelog)
  }
}
