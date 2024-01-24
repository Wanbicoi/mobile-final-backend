import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import {
  BooleanDto,
  CreateCommentDto,
  CreateFoodDto,
  UpdateBlogDto,
} from 'src/common/dtos';
import { FoodService } from 'src/common/providers';
import { User } from 'src/decorators';

@ApiTags('foods')
@Controller('foods')
@ApiBearerAuth('defaultBearerAuth')
export class FoodController {
  constructor(private readonly foodservice: FoodService) {}

  @Post()
  create(@Body() createFoodDto: CreateFoodDto, @User() userId: number) {
    return this.foodservice.create(
      {
        ...createFoodDto,
        categories: !createFoodDto.categories
          ? undefined
          : {
              connect: createFoodDto.categories.map((category) => ({
                name: category,
              })),
            },
      },
      userId,
    );
  }

  @ApiQuery({ name: 'skip', required: false })
  @ApiQuery({ name: 'take', required: false })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'order', required: false, example: 'asc' })
  @ApiQuery({ name: 'category', required: false, example: 'hello' })
  @Get('')
  findAll(
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
    @Query('take', new DefaultValuePipe(20), ParseIntPipe) take: number,
    @Query('search') search: string,
    @Query('order', new DefaultValuePipe('asc')) order: 'asc' | 'desc',
    @Query('category') category: string,
    @User() userId: number,
  ) {
    return this.foodservice.findAll(
      skip,
      take,
      search,
      order,
      category,
      userId,
    );
  }

  @Get('favourites')
  findFavourites(@User('id') userId: number) {
    return this.foodservice.findFavourites(userId);
  }

  @Get(':id')
  findOne(@User() userId: number, @Param('id', ParseIntPipe) id: number) {
    return this.foodservice.findOne({ id }, userId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBlogDto: UpdateBlogDto,
  ) {
    return this.foodservice.update({ id }, updateBlogDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.foodservice.remove({ id });
  }

  @Post(':id/like')
  like(
    @Param('id', ParseIntPipe) id: number,
    @User('id') userId: number,
    @Body() booleanDto: BooleanDto,
  ) {
    return this.foodservice.like({ id }, booleanDto.value, userId);
  }

  @Post(':id/comment')
  comment(
    @Param('id', ParseIntPipe) id: number,
    @User('id') userId: number,
    @Body() commentDto: CreateCommentDto,
  ) {
    return this.foodservice.comment({ id }, userId, commentDto.body);
  }
}
