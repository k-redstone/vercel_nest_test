import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

import { ConfigModule } from '@nestjs/config'
import { UserModule } from '@src/user/user.module'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from '@src/auth/strategy/jwt.strategy'
import { JwtAuthGuard } from '@src/auth/guards/jwt-auth.guard'

@Module({
  imports: [ConfigModule, UserModule, JwtModule.register({ global: true })],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthGuard, JwtStrategy],
  exports: [JwtAuthGuard],
})
export class AuthModule {}
