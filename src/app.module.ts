import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CommonModule } from './common';
import { DatabaseModule } from './database';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    CommonModule,
    DatabaseModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],

  controllers: [AppController],
})
export class AppModule {}
