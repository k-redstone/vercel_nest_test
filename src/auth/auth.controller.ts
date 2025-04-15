import { Body, Controller, Post, Res, Req } from '@nestjs/common'
import { AuthService } from '@src/auth/auth.service'

import { LoginDto } from '@src/auth/dtos/login.dto'
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {}
}
