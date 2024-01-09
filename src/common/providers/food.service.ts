import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database';
import { Prisma, Food } from '@prisma/client';

@Injectable()
export class FoodService {
  constructor(private readonly prisma: PrismaService) {}
  async findOne(
    productWhereUniqueInput: Prisma.FoodWhereUniqueInput,
  ): Promise<Food | null> {
    return this.prisma.food.findUniqueOrThrow({
      where: productWhereUniqueInput,
    });
  }
  create(data: Prisma.FoodCreateInput) {
    return this.prisma.food.create({ data });
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
}
