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
  async follow(@User() userId: number, @Body() followDto: FollowDto) {
    await this.profileService.follow(
      followDto.targetId,
      followDto.follow,
      userId,
    );
    return {};
  }

  @Get()
  view(@User() userId: number) {
    return this.profileService.viewCurrent(userId);
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) targetId: number, @User() userId: number) {
    return this.profileService.view(targetId, userId);
  }
}
