import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUser {
  @ApiProperty({
    required: true,
    minLength: 3,
    type: 'string',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @ApiProperty({ required: true, type: 'string' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ required: true, minLength: 8, type: 'string' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}

export class LoginUserDto {
  @ApiProperty({ required: true, type: 'string' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ required: true, minLength: 8, type: 'string' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
