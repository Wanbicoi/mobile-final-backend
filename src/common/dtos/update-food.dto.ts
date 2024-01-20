import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateFoodDto } from '.';

export class UpdateBlogDto extends PartialType(
  OmitType(CreateFoodDto, ['categories'] as const),
) {}
