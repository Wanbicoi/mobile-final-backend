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
  async auth(idToken: string) {
    try {
      const { uid, email } = await this.firebase.auth.verifyIdToken(idToken);
      let existingUser = await this.prisma.user.findFirst({
        where: { uid: uid },
      });
      if (!existingUser)
        existingUser = await this.prisma.user.create({
          data: { uid, name: email },
        });
      return {
        accessToken: await this.jwtService.signAsync({ sub: existingUser.id }),
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
