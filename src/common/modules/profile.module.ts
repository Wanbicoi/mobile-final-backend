import { Module } from '@nestjs/common';
import { ProfileController } from '../controllers';
import { ProfileService } from '../providers';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
