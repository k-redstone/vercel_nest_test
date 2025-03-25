import { Module } from '@nestjs/common'
import { ValorantMatchController } from './valorant-match.controller'
import { ValorantMatchService } from './valorant-match.service'

import { TypeOrmModule } from '@nestjs/typeorm'

import { ValorantMatchEntity } from '@src/valorant-match/entities/valorant-match.entitiy'
import { ValorantMatchPlayerEntity } from '@src/valorant-match/entities/valorant-match-player.entity'
@Module({
  imports: [
    TypeOrmModule.forFeature([ValorantMatchEntity, ValorantMatchPlayerEntity]),
  ],
  controllers: [ValorantMatchController],
  providers: [ValorantMatchService],
})
export class ValorantMatchModule {}
