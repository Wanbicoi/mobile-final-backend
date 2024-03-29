import { Injectable } from '@nestjs/common';
import { Food, Prisma } from '@prisma/client';
import { FirebaseAdmin, InjectFirebaseAdmin } from 'nestjs-firebase';
import { PrismaService } from 'src/database';
import { UpdateBlogDto } from '../dtos';

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
  async create(data: Omit<Prisma.FoodCreateInput, 'author'>, userId: number) {
    const tokens = await this.prisma.fCMToken.findMany();
    await this.firebase.messaging.sendMulticast({
      tokens: tokens.map((token) => token.token),
      notification: {
        title: 'Notifications',
        body: 'You have a new follower!',
      },
    });
    return await this.prisma.food.create({
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
    category: string,
    userId: number,
  ) {
    const query = {
      where: {
        title: {
          contains: search,
          mode: 'insensitive',
        },
      },
      include: {
        author: { select: { name: true, imageUrl: true } },
        comments: {
          include: { author: { select: { imageUrl: true, name: true } } },
        },
        _count: { select: { likers: true } },
      },
      skip,
      take,
    };
    if (category) {
      //@ts-ignore
      query.where.categories = { some: { name: { equals: category } } };
    }
    const foods = await this.prisma.food.findMany(query as any);
    return foods.map((food: any) => ({
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
      notification: { title: 'Notifications', body: 'Someone like yours food' },
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
