import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Banh xeo`' })
  @IsNotEmpty()
  name: string;
}
