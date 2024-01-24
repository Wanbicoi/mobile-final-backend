import { Injectable } from '@nestjs/common';
import { Food, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database';
import { UpdateBlogDto } from '../dtos';
import { InjectFirebaseAdmin, FirebaseAdmin } from 'nestjs-firebase';

@Injectable()
export class FoodService {
  constructor(
    private readonly prisma: PrismaService,
    @InjectFirebaseAdmin() private readonly firebase: FirebaseAdmin,
  ) {}
  async findOne(
    productWhereUniqueInput: Prisma.FoodWhereUniqueInput,
    userId: number,
  ): Promise<any> {
    const res = await this.prisma.food.findUniqueOrThrow({
      include: {
        comments: {
          include: { author: { select: { imageUrl: true, name: true } } },
        },
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

  async findAll(
    skip: number,
    take: number,
    search: string,
    order: 'asc' | 'desc',
    category: string,
    userId: number,
  ) {
    const foods = await this.prisma.food.findMany({
      where: {
        title: {
          contains: search,
          // mode: 'insensitive',
        },
        categories: { some: { name: { equals: category } } },
      },
      include: {
        author: { select: { name: true, imageUrl: true } },
        comments: {
          include: { author: { select: { imageUrl: true, name: true } } },
        },
        _count: { select: { likers: true } },
      },
      orderBy: {
        createdAt: order,
      },
      skip,
      take,
    });
    return foods.map((food) => ({
      ...food,
      _count: undefined,
      likers_count: food._count.likers,
    }));
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

  async like(
    where: Prisma.FoodWhereUniqueInput,
    liked: boolean,
    userId: number,
  ) {
    // const user = await this.prisma.user.findUnique({
    //   where: { id: userId },
    //   select: { fcmTokens: true },
    // });
    const tokens = await this.prisma.fCMToken.findMany();
    await this.firebase.messaging.sendMulticast({
      tokens: tokens.map((token) => token.token),
      notification: { title: 'Thông báo', body: 'Someone like yours' },
    });
    return await this.prisma.food.update({
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
