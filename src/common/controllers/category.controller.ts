import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoryService } from 'src/common/providers';
import { Public } from 'src/decorators/public.decorator';

@ApiTags('categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  // @ApiBearerAuth('defaultBearerAuth')
  // @Post()
  // create(@Body() createCategoryDto: CreateCategoryDto) {
  //   return this.categoryService.create(createCategoryDto);
  // }

  @Public()
  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  // @ApiBearerAuth('defaultBearerAuth')
  // @Delete(':id')
  // async remove(@Param('id', ParseIntPipe) name: string) {
  //   await this.categoryService.remove({ name });
  // }
}
