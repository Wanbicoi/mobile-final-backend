import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database';
import { Prisma } from '@prisma/client';

@Injectable()
export class FoodListService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.foodList.findMany({
      include: {
        foods: {
          select: { id: true, title: true, images: true, body: true },
        },
      },
    });
  }
  async findOne(where: Prisma.FoodListWhereUniqueInput, userId: number) {
    const foodList = await this.prisma.foodList.findUniqueOrThrow({
      where,
      include: {
        foods: {
          select: { id: true, title: true, images: true, body: true },
        },
        author: {
          select: {
            id: true,
            name: true,
            imageUrl: true,
            _count: {
              select: {
                followers: true,
                following: true,
              },
            },
          },
        },
        likers: { where: { id: userId } },
      },
    });

    return {
      ...foodList,
      likers: undefined,
      isFavourite: foodList.likers.length != 0,
      author: {
        ...foodList.author,
        _count: undefined,
        ...foodList.author._count,
      },
    };
  }

  async findFavourites(userId: number) {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { id: userId },
      select: {
        favouriteFoodLists: {
          include: {
            foods: {
              select: { id: true, title: true, images: true, body: true },
            },
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
