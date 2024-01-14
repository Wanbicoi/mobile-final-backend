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
  async signIn(idToken: string) {
    try {
      const { uid } = await admin.auth().verifyIdToken(idToken);

      const existingUser = await this.prisma.user.findFirst({
        where: { uid: idToken },
      });
      if (!existingUser)
        await this.prisma.user.create({
          data: { uid, name: 'user_' + short.generate() },
        });
      return this.jwtService.signAsync({ sub: uid });
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}
