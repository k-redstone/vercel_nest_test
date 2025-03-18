import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common'

@Injectable()
export class DenyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    throw new ForbiddenException('해당 API는 접근할 수 없습니다.')
  }
}
