import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FirebaseAdmin, InjectFirebaseAdmin } from 'nestjs-firebase';
import { PrismaService } from 'src/database';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly prisma: PrismaService,
    @InjectFirebaseAdmin() private readonly firebase: FirebaseAdmin,
  ) {}
  async auth(idToken: string, fcmToken: string) {
    try {
      const { uid, email } = await this.firebase.auth.verifyIdToken(idToken);
      let existingUser = await this.prisma.user.findFirst({
        where: { uid: uid },
      });
      if (!existingUser)
        existingUser = await this.prisma.user.create({
          data: { uid, name: email },
        });

      let existingUserFCMToken = await this.prisma.fCMToken.findFirst({
        where: { token: fcmToken, userId: existingUser.id },
      });
      if (!existingUserFCMToken)
        await this.prisma.fCMToken.create({
          data: { userId: existingUser.id, token: fcmToken },
        });
      return {
        id: existingUser.id,
        accessToken: await this.jwtService.signAsync({ sub: existingUser.id }),
      };
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
  async authTest() {
    const user = await this.prisma.user.findFirstOrThrow({
      where: { name: '123@gmail.com' },
    });
    return this.jwtService.signAsync({ sub: user.id });
  }
}
