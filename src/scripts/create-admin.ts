import { NestFactory } from '@nestjs/core'
import { AppModule } from '@src/app.module'
import { UserService } from '@src/user/user.service'

import * as bcrypt from 'bcrypt'

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule)
  const usersService = app.get(UserService)

  const userId = process.argv[2]
  const password = process.argv[3]

  if (!userId || !password) {
    console.log('사용법: yarn run create-admin <userId> <password>')
    process.exit(1)
  }

  const hash = await bcrypt.hash(password, 10)
  await usersService.create(userId, hash, true)

  console.log(`어드민 계정 생성 완료: ${userId}`)
  await app.close()
}

bootstrap()
