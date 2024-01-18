import { Module } from '@nestjs/common';
import { FoodListController } from '../controllers';
import { FoodListService } from '../providers';

@Module({
  controllers: [FoodListController],
  providers: [FoodListService],
})
export class FoodListModule {}
