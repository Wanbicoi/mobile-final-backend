import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LogInDto } from './log-in.dto';
import { Public } from 'src/decorators/public.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post()
  logIn(@Body() logInDto: LogInDto) {
    return this.authService.logIn(logInDto.userName, logInDto.password);
  }
}
