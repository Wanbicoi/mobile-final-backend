import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}
  create(data: Prisma.CategoryCreateInput) {
    return this.prisma.category.create({ data });
  }

  findAll() {
    return this.prisma.category.findMany();
  }

  async remove(where: Prisma.CategoryWhereUniqueInput) {
    await this.prisma.category.delete({ where });
  }
}
