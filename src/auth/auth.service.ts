import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import * as bcrypt from 'bcrypt'

import { ConfigService } from '@nestjs/config'
@Injectable()
export class AuthService {
  constructor(private readonly configService: ConfigService) {}
}
