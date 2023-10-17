import { IsNotEmpty, IsObject, IsString } from 'class-validator';

export class CreateBlogDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsString()
  @IsNotEmpty()
  category: string;
}

export class UpdateBlogDto {
  @IsString()
  @IsNotEmpty()
  blodId: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  category: string;
}

class PictureDto {
  @IsNotEmpty()
  @IsString()
  url: string;

  @IsNotEmpty()
  @IsString()
  publicId: string;
}

export class AddBlogDto extends CreateBlogDto {
  @IsObject()
  @IsNotEmpty()
  picture: PictureDto;

  @IsObject()
  @IsNotEmpty()
  user: string;
}
