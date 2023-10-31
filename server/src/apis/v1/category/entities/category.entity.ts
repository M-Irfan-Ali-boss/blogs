import { ApiProperty } from '@nestjs/swagger';

export class CategoryEntity {
  @ApiProperty()
  _id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  udpdatedAt: Date;
  @ApiProperty()
  __v: number;
}

export class CategoryPostEntity {
  @ApiProperty({ required: true })
  name: string;
}
