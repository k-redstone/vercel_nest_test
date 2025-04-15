import {
  Body,
  Controller,
  Post,
  Res,
  Req,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common'
import { AuthService } from '@src/auth/auth.service'

import { LoginDto } from '@src/auth/dtos/login.dto'
import { Response, Request } from 'express'

import { JwtAuthGuard } from '@src/auth/guards/jwt-auth.guard'
import { ConfigService } from '@nestjs/config'
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('/login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tokenData = await this.authService.login(loginDto)

    res.cookie('accessToken', tokenData.accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: this.configService.get('JWT_ACCESS_TOKEN_EXP'),
    })

    res.cookie('refreshToken', tokenData.refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: this.configService.get('JWT_REFRESH_TOKEN_EXP'),
    })

    return { message: 'login success' }
  }

  @Post('/refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) throw new UnauthorizedException()

    const tokenData = await this.authService.refresh(refreshToken)

    res.cookie('accessToken', tokenData.accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: this.configService.get('JWT_ACCESS_TOKEN_EXP'),
    })

    res.cookie('refreshToken', tokenData.refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: this.configService.get('JWT_REFRESH_TOKEN_EXP'),
    })

    return { message: 'refreshed' }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const id = req.user.sub

    await this.authService.logout(id)

    res.clearCookie('accessToken')
    res.clearCookie('refreshToken')

    return { message: 'logout success' }
  }
}
