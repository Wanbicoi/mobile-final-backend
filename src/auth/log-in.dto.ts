import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LogInDto {
  @ApiProperty({ example: 'adminvuive' })
  @IsNotEmpty()
  userName: string;

  @ApiProperty({ example: 'chucbanthanhcong' })
  @IsNotEmpty()
  password: string;
}
