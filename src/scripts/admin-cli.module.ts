import { Module } from '@nestjs/common'

import { ConfigModule, ConfigService } from '@nestjs/config'

import { TypeOrmModule } from '@nestjs/typeorm'
import { typeOrmConfig } from '@src/config/typeorm.config'

import { UserEntity } from '@src/user/entities/user.entity'

import { UserService } from '@src/user/user.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const env = process.env.NODE_ENV || 'development'
        return typeOrmConfig(env, configService)
      },
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [UserService],
})
export class AdminCliModule {}
