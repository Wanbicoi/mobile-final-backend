import { Injectable } from '@nestjs/common';
import { Food, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database';
import { UpdateBlogDto } from '../dtos';

@Injectable()
export class FoodService {
  constructor(private readonly prisma: PrismaService) {}
  async findOne(
    productWhereUniqueInput: Prisma.FoodWhereUniqueInput,
    userId: number,
  ): Promise<any> {
    const res = await this.prisma.food.findUniqueOrThrow({
      include: {
        comments: true,
        author: true,
        categories: true,
        _count: { select: { likers: true } },
        likers: { where: { id: userId } },
      },
      where: productWhereUniqueInput,
    });
    return {
      ...res,
      likers_count: res._count.likers,
      isFavourite: res.likers.length != 0,
      _count: undefined,
      likers: undefined,
    };
  }
  create(data: Omit<Prisma.FoodCreateInput, 'author'>, userId: number) {
    return this.prisma.food.create({
      data: { ...data, author: { connect: { id: userId } } },
    });
  }

  async findFavourites(userId: number) {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { id: userId },
      select: { favouriteFoods: true },
    });
    return user.favouriteFoods;
  }

  findAll(
    skip: number,
    take: number,
    search: string,
    order: 'asc' | 'desc',
    category: string,
  ) {
    const query: Prisma.FoodFindManyArgs = {
      where: {
        title: {
          contains: search,
          // mode: 'insensitive',
        },
        categories: { some: { name: { equals: category } } },
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
    data: UpdateBlogDto,
  ): Promise<Food> {
    return this.prisma.food.update({
      where,
      data,
    });
  }

  remove(where: Prisma.FoodWhereUniqueInput) {
    return this.prisma.food.delete({ where });
  }

  like(where: Prisma.FoodWhereUniqueInput, liked: boolean, userId: number) {
    return this.prisma.food.update({
      where,
      data: {
        likers: {
          [liked ? 'connect' : 'disconnect']: { id: userId },
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
