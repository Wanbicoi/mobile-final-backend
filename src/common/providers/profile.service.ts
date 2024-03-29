import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { InjectFirebaseAdmin, FirebaseAdmin } from 'nestjs-firebase';
import { PrismaService } from 'src/database';

@Injectable()
export class ProfileService {
  constructor(
    private readonly prisma: PrismaService,
    @InjectFirebaseAdmin() private readonly firebase: FirebaseAdmin,
  ) {}

  async update(
    where: Prisma.UserWhereUniqueInput,
    data: Prisma.UserUpdateInput,
  ) {
    await this.prisma.user.update({ where, data });
  }
  async view(targetId: number, userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: targetId },
      include: {
        foods: { select: { id: true, title: true, images: true, body: true } },
        foodLists: true,
        _count: {
          select: {
            followers: true,
            following: true,
          },
        },
        followers: { where: { followerId: userId } },
      },
    });
    return {
      ...user,
      uid: undefined,
      _count: undefined,
      ...user._count,
      isFollowed: user.followers.length != 0,
    };
  }

  async viewCurrent(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        foods: { select: { id: true, title: true, images: true, body: true } },
        foodLists: true,
        _count: {
          select: {
            followers: true,
            following: true,
          },
        },
      },
    });
    return {
      ...user,
      uid: undefined,
      _count: undefined,
      ...user._count,
    };
  }

  async follow(targetId: number, follow: boolean, userId: number) {
    const tokens = await this.prisma.fCMToken.findMany();
    await this.firebase.messaging.sendMulticast({
      tokens: tokens.map((token) => token.token),
      notification: {
        title: 'Notifications',
        body: 'You have a new follower!',
      },
    });

    const user = await this.prisma.follows.findUnique({
      where: {
        followerId_followingId: { followingId: targetId, followerId: userId },
      },
    });
    if (!follow && user)
      await this.prisma.follows.delete({
        where: {
          followerId_followingId: { followingId: targetId, followerId: userId },
        },
      });
    else if (follow && !user)
      await this.prisma.follows.create({
        data: {
          followingId: targetId,
          followerId: userId,
        },
      });
  }
}
