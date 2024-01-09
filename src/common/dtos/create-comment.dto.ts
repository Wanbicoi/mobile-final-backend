import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ example: 'Chú cuội đợi chị Hằng' })
  @IsNotEmpty()
  body: string;
}
