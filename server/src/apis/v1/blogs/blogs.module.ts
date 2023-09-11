import { Module } from '@nestjs/common';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogSchema } from './schemas/blog.schema';
import { FileValidationPipe } from './pipe/file-validation.pipe';
import { FileUploadPipe } from './pipe/file-upload.pipe';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Blog', schema: BlogSchema }])],
  controllers: [BlogsController],
  providers: [BlogsService, FileValidationPipe, FileUploadPipe],
})
export class BlogsModule {}
