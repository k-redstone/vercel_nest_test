import { Module } from '@nestjs/common'
import { AppController } from '@src/app.controller'
import { AppService } from '@src/app.service'

import { ConfigModule, ConfigService } from '@nestjs/config'

import { TypeOrmModule } from '@nestjs/typeorm'
import { typeOrmConfig } from '@src/config/typeorm.config'
import { StreamersModule } from '@src/streamers/streamers.module'

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
    StreamersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
