import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';
import { Public } from 'src/decorators/public.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post()
  auth(@Body() autoDto: AuthDto) {
    return this.authService.auth(autoDto.idToken);
  }

  @Public()
  @Post('test')
  authTest() {
    return this.authService.authTest();
  }
}
