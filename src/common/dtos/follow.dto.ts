import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class FollowDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  targetId: number;

  @ApiProperty({ example: true })
  @IsNotEmpty()
  @IsBoolean()
  follow: boolean;
}
