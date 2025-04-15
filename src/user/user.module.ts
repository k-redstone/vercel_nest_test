import { Module } from '@nestjs/common'
import { UserService } from '@src/user/user.service'

import { TypeOrmModule } from '@nestjs/typeorm'

import { UserEntity } from '@src/user/entities/user.entity'
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
