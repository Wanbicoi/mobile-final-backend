import { Body, Controller, Get, Patch } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProfileService } from 'src/common/providers';
import { User } from 'src/decorators';
import { UpdateProfileDto } from '../dtos';

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

  @Get()
  view(@User() userId: number) {
    return this.profileService.view(userId);
  }
}
