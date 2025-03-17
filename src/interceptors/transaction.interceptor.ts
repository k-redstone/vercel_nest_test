import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  InternalServerErrorException,
  Injectable,
} from '@nestjs/common'
import { catchError, Observable, tap } from 'rxjs'

import { DataSource } from 'typeorm'

export function Transactional() {
  return UseInterceptors(TransactionInterceptor)
}
@Injectable()
export class TransactionInterceptor implements NestInterceptor {
  constructor(private readonly dataSource: DataSource) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const queryRunner = this.dataSource.createQueryRunner()

    await queryRunner.connect()
    await queryRunner.startTransaction()
    return next.handle().pipe(
      catchError(async (error) => {
        await queryRunner.rollbackTransaction()
        await queryRunner.release()

        if (error instanceof HttpException) {
          throw new HttpException(error.message, error.getStatus())
        } else {
          throw new InternalServerErrorException(error)
        }
      }),

      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      tap(async () => {
        await queryRunner.commitTransaction()
        await queryRunner.release()
      }),
    )
  }
}
