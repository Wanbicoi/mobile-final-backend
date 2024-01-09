import { Module } from '@nestjs/common';
import { FoodService } from '../providers';
import { BlogController } from '../controllers';

@Module({
  controllers: [BlogController],
  providers: [FoodService],
})
export class BlogModule {}
