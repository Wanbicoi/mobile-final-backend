import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FoodListService } from 'src/common/providers';
import { User } from 'src/decorators';
import { Public } from 'src/decorators/public.decorator';
import { BooleanDto } from '../dtos';

@ApiTags('food-list')
@Controller('food-list')
@ApiBearerAuth('defaultBearerAuth')
export class FoodListController {
  constructor(private readonly foodListService: FoodListService) {}

  @Public()
  @Get()
  findAll() {
    return this.foodListService.findAll();
  }

  @Get('favourites')
  findFavourites(@User() userId: number) {
    return this.foodListService.findFavourites(userId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @User('id') userId: number) {
    return this.foodListService.findOne({ id }, userId);
  }

  @Post(':id/like')
  like(
    @Param('id', ParseIntPipe) id: number,
    @User('id') userId: number,
    @Body() booleanDto: BooleanDto,
  ) {
    return this.foodListService.like({ id }, booleanDto.value, userId);
  }
}
