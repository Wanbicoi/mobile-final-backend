import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import short from 'short-uuid';
import { PrismaService } from 'src/database';
import * as admin from 'firebase-admin';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}
  async auth(idToken: string) {
    try {
      const { uid } = await admin.auth().verifyIdToken(idToken);

      const existingUser = await this.prisma.user.findFirst({
        where: { uid: idToken },
      });
      if (!existingUser)
        await this.prisma.user.create({
          data: { uid, name: 'user_' + short.generate() },
        });
      return {
        access_token: this.jwtService.signAsync({ sub: existingUser.id }),
      };
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
  async authTest() {
    const user = await this.prisma.user.findUnique({
      where: { uid: ';lkasjdfa;kj' },
    });
    return this.jwtService.signAsync({ sub: user.id });
  }
}
