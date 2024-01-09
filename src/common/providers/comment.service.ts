import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database';
import { Prisma } from '@prisma/client';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: Prisma.CommentCreateInput) {
    return this.prisma.comment.create({ data });
  }

  remove(where: Prisma.CommentWhereUniqueInput) {
    return this.prisma.comment.delete({ where });
  }
}
