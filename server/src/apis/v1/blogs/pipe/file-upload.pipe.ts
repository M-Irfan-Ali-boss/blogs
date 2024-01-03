import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import * as cloudinary from 'cloudinary';
import { v4 as uuidv4 } from 'uuid';
import { Request } from 'express'; // Import Request
import { FileValidationPipe } from './file-validation.pipe';

@Injectable()
export class FileUploadPipe implements PipeTransform {
  constructor(private readonly fileValidationPipe: FileValidationPipe) {}

  async transform(
    req: Request, // Inject Request
  ): Promise<any> {
    const file: Express.Multer.File = req['file']; // Access the file from Request
    if (!file) {
      throw new BadRequestException('File not provided');
    }

    await this.fileValidationPipe.transform(file);

    const uniqueFileName = uuidv4();
    // Upload the file to Cloudinary
    const result = await cloudinary.v2.uploader.upload(
      `data:${file.mimetype};base64,${file.buffer.toString('base64')}`,
      {
        folder: 'blogs',
        public_id: uniqueFileName,
      },
    );

    // Return the Cloudinary URL
    return { url: result.secure_url, publicId: uniqueFileName };
  }
}
