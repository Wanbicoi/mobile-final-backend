import { Module } from '@nestjs/common';
import { CommentService } from '../providers';
import { CommentController } from '../controllers';

@Module({
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
