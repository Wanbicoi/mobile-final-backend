import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileDto {
  @ApiProperty({ example: 'Trung' })
  name: string;
  @ApiProperty({ example: 'Trung' })
  bio: string;
  @ApiProperty({ example: 'Trung' })
  imageUrl: string;
}
