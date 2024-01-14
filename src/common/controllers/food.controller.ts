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
  CreateCommentDto,
  CreateFoodDto,
  UpdateBlogDto,
} from 'src/common/dtos';
import { FoodService } from 'src/common/providers';
import { User } from 'src/decorators';
import { Public } from 'src/decorators/public.decorator';

@ApiTags('foods')
@Controller('foods')
export class BlogController {
  constructor(private readonly foodservice: FoodService) {}

  @ApiBearerAuth('defaultBearerAuth')
  @Post()
  create(@Body() createFoodDto: CreateFoodDto, @User() userId: number) {
    return this.foodservice.create({
      ...createFoodDto,
      author: { connect: { id: userId } },
    });
  }

  @ApiQuery({ name: 'skip', required: false })
  @ApiQuery({ name: 'take', required: false })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'order', required: false, example: 'asc' })
  @Public()
  @Get()
  findAll(
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
    @Query('take', new DefaultValuePipe(20), ParseIntPipe) take: number,
    @Query('search') search: string,
    @Query('order', new DefaultValuePipe('asc')) order: 'asc' | 'desc',
  ) {
    return this.foodservice.findAll(skip, take, search, order);
  }

  @Get('favourites')
  findFavourites(@User('id') userId: number) {
    return this.foodservice.findFavourites(userId);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.foodservice.findOne({ id });
  }

  @ApiBearerAuth('defaultBearerAuth')
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBlogDto: UpdateBlogDto,
  ) {
    return this.foodservice.update({ id }, updateBlogDto);
  }

  @ApiBearerAuth('defaultBearerAuth')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.foodservice.remove({ id });
  }

  @ApiBearerAuth('defaultBearerAuth')
  @Post(':id/like')
  like(@Param('id', ParseIntPipe) id: number, @User('id') userId: number) {
    return this.foodservice.like({ id }, userId);
  }

  @ApiBearerAuth('defaultBearerAuth')
  @Post(':id/comment')
  comment(
    @Param('id', ParseIntPipe) id: number,
    @User('id') userId: number,
    @Body() commentDto: CreateCommentDto,
  ) {
    return this.foodservice.comment({ id }, userId, commentDto.body);
  }
}
