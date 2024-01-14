import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database';
import { Prisma, Food } from '@prisma/client';

@Injectable()
export class FoodService {
  constructor(private readonly prisma: PrismaService) {}
  async findOne(
    productWhereUniqueInput: Prisma.FoodWhereUniqueInput,
  ): Promise<any> {
    const res = await this.prisma.food.findUniqueOrThrow({
      include: {
        comments: true,
        author: true,
        categories: true,
        likers: { select: { _count: true } }, // return number only
      },
      where: productWhereUniqueInput,
    });
    return { ...res };
  }
  create(data: Prisma.FoodCreateInput) {
    return this.prisma.food.create({ data });
  }

  async findFavourites(userId: number) {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { id: userId },
      select: { favouriteFoods: true },
    });
    return user.favouriteFoods;
  }

  findAll(skip: number, take: number, search: string, order: 'asc' | 'desc') {
    const query: Prisma.FoodFindManyArgs = {
      where: {
        title: {
          contains: search,
          // mode: 'insensitive',
        },
      },
      orderBy: {
        createdAt: order,
      },
      skip,
      take,
    };
    return this.prisma.food.findMany(query);
  }

  async update(
    where: Prisma.FoodWhereUniqueInput,
    data: Prisma.FoodUpdateInput,
  ): Promise<Food> {
    return this.prisma.food.update({
      where,
      data,
    });
  }

  remove(where: Prisma.FoodWhereUniqueInput) {
    return this.prisma.food.delete({ where });
  }

  like(where: Prisma.FoodWhereUniqueInput, userId: number) {
    return this.prisma.food.update({
      where,
      data: {
        likers: {
          connect: { id: userId },
        },
      },
    });
  }

  comment(where: Prisma.FoodWhereUniqueInput, userId: number, body: string) {
    return this.prisma.comment.create({
      data: {
        body,
        author: { connect: { id: userId } },
        food: { connect: { id: where.id } },
      },
    });
  }
}
