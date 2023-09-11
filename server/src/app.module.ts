import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseConfigModule } from '@dbConfig/database.config';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from '@exception/global-exception';
import { UserModule } from './apis/v1/user/user.module';

@Module({
  imports: [DatabaseConfigModule, UserModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
