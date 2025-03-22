import { Controller, Get } from '@nestjs/common'

import { ChangelogsService } from '@src/changelogs/changelogs.service'

@Controller('changelog')
export class ChangelogsController {
  constructor(private readonly changelogsService: ChangelogsService) {}

  @Get('/recent')
  async getRecentChangelog() {
    return this.changelogsService.getRecentChangelog()
  }

  @Get('/all')
  async getAllChangelog() {
    return this.changelogsService.getAllChangelog()
  }
}
