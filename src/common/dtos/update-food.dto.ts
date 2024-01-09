import { PartialType } from '@nestjs/swagger';
import { CreateFoodDto } from '.';

export class UpdateBlogDto extends PartialType(CreateFoodDto) {}
