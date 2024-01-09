import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateCategoryDto } from 'src/common/dtos';
import { CategoryService } from 'src/common/providers';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorators/public.decorator';

@ApiTags('categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiBearerAuth('defaultBearerAuth')
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @ApiBearerAuth('defaultBearerAuth')
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) name: string) {
    await this.categoryService.remove({ name });
  }
}
