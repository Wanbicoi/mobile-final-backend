import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AuthDto {
  @ApiProperty({ example: 'replace this to id token' })
  @IsNotEmpty()
  idToken: string;

  @ApiProperty({ example: 'replace this to fcm token' })
  @IsNotEmpty()
  fcmToken: string;
}
