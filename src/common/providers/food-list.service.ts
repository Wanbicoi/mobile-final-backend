import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database';
import { Prisma } from '@prisma/client';

@Injectable()
export class FoodListService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.foodList.findMany({
      include: {
        foods: true,
      },
    });
  }

  async findFavourites(userId: number) {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { id: userId },
      select: {
        favouriteFoodLists: {
          include: {
            foods: true,
          },
        },
      },
    });
    return user.favouriteFoodLists;
  }

  like(where: Prisma.FoodListWhereUniqueInput, liked: boolean, userId: number) {
    return this.prisma.foodList.update({
      where,
      data: {
        likers: {
          [liked ? 'connect' : 'disconnect']: { id: userId },
        },
      },
    });
  }
}
