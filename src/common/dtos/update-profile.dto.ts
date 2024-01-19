import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateProfileDto {
  @ApiPropertyOptional({ example: 'Trung' })
  @IsOptional()
  name: string;

  @ApiPropertyOptional({ example: 'Trung' })
  @IsOptional()
  bio: string;

  @ApiPropertyOptional({ example: 'Trung' })
  @IsOptional()
  imageUrl: string;
}
