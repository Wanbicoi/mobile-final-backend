import { Module } from '@nestjs/common';
import { CategoryController } from '../controllers';
import { CategoryService } from '../providers';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
