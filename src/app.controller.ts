import { Controller, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Public } from './decorators/public.decorator';

@Controller()
export class AppController {
  @ApiOperation({ summary: 'checkHealth' })
  @Public()
  @Get()
  checkHealth(): string {
    return `🍀 Ai nắn thân em khéo trĩnh tròn
Làn da trắng mịn, ruột như son
Ngọt thơm thỏa dạ người quân tử
Duyên nợ mặn nồng với nước non 💃

--- ${new Date().toLocaleString()} ---'`;
  }
}
