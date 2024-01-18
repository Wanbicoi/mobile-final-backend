import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async update(
    where: Prisma.UserWhereUniqueInput,
    data: Prisma.UserUpdateInput,
  ) {
    await this.prisma.user.update({ where, data });
  }

  async view(userId: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    return { ...user, uid: undefined };
  }
}
