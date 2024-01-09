import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async logIn(userName: string, password: string) {
    if (
      userName == this.configService.get('ADMIN_USERNAME') &&
      password == this.configService.get('ADMIN_PASSWORD')
    )
      return {
        accessToken: await this.jwtService.signAsync({}),
      };
    else throw new BadRequestException('userName or password are invalid!');
  }
}
