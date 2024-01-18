import { Module } from '@nestjs/common';
import { FoodService } from '../providers';
import { FoodController } from '../controllers';

@Module({
  controllers: [FoodController],
  providers: [FoodService],
})
export class BlogModule {}
