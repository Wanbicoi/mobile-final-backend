import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProfileService } from 'src/common/providers';
import { User } from 'src/decorators';
import { FollowDto, UpdateProfileDto } from '../dtos';

@ApiTags('profile')
@Controller('profile')
@ApiBearerAuth('defaultBearerAuth')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Patch()
  update(
    @User('id') userId: number,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.profileService.update({ id: userId }, updateProfileDto);
  }

  @Post('follow')
  follow(@User() userId: number, @Body() followDto: FollowDto) {
    return this.profileService.follow(
      followDto.targetId,
      followDto.follow,
      userId,
    );
  }

  @Get()
  view(@User() userId: number) {
    return this.profileService.view(userId);
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) userId: number) {
    return this.profileService.view(userId);
  }
}
