import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from '@apis/v1/category/category.module';
import { BlogsModule } from '@apis/v1/blogs/blogs.module';
import { AuthModule } from '@apis/v1/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRootAsync({
      useFactory: () => ({ uri: process.env.MONGODB_URI }),
    }),
    CategoryModule,
    BlogsModule,
    AuthModule,
  ],
})
export class DatabaseConfigModule {}
