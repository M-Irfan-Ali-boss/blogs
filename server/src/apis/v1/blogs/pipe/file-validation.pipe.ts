import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import * as mime from 'mime';
import * as path from 'path';

@Injectable()
export class FileValidationPipe implements PipeTransform<any> {
  async transform(value: any): Promise<any> {
    if (!value || !value.buffer) {
      throw new BadRequestException('File is required');
    }

    const fileExtension = path.extname(value.originalname);
    const mimeType = mime.getType(fileExtension);

    if (
      !mimeType ||
      !['image/jpeg', 'image/png', 'image/jpg'].includes(mimeType)
    ) {
      throw new BadRequestException(
        'Invalid file type. Supported types: jpeg, png, jpg',
      );
    }

    return value;
  }
}
