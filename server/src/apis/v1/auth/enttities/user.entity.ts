import { ApiProperty } from '@nestjs/swagger';

export class UserEntity {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  __v: number;
}

export class LoginUserEntity {
  @ApiProperty()
  user: UserEntity;

  @ApiProperty()
  token: string;
}
