import { Module } from '@nestjs/common'
import { ValorantMatchController } from './valorant-match.controller'
import { ValorantMatchService } from './valorant-match.service'

@Module({
  controllers: [ValorantMatchController],
  providers: [ValorantMatchService],
})
export class ValorantMatchModule {}
