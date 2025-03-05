import { DataSourceOptions } from 'typeorm'
import { ConfigService } from '@nestjs/config'
import { Streamer } from '@src/streamers/streamer.entity'

export const typeOrmConfig = (
  env: string,
  configService: ConfigService,
): DataSourceOptions => {
  switch (env) {
    case 'production':
      return {
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [Streamer],
        migrations: ['dist/migrations/*.js'],
        synchronize: false,
        logging: true,
      }

    case 'development':
    default:
      return {
        type: 'sqlite',
        database: 'db.sqlite',
        entities: [Streamer],
        synchronize: true,
        logging: true,
      }
  }
}
