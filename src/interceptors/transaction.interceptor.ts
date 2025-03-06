import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  InternalServerErrorException,
  applyDecorators,
} from '@nestjs/common'
import { catchError, mergeMap, Observable, tap } from 'rxjs'

import { DataSource } from 'typeorm'

export function Transactional() {
  return applyDecorators(UseInterceptors(TransactionInterceptor))
}

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

      mergeMap(async () => {
        await queryRunner.commitTransaction()
        await queryRunner.release()
      }),
    )
  }
}
