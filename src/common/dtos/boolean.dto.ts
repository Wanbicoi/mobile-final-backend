import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class BooleanDto {
  @ApiProperty({ example: true })
  @IsNotEmpty()
  @IsBoolean()
  value: boolean;
}
