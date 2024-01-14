import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { PrismaExceptionFilter } from './filters';
import * as admin from 'firebase-admin';
import { client_email, private_key, project_id } from './fooder.json';

async function bootstrap() {
  // var serviceAccount = require('./fooder.json');
  //
  // admin.initializeApp({
  //   credential: admin.credential.cert(serviceAccount),
  // });
  admin.initializeApp({
    credential: admin.credential.cert({
      clientEmail: client_email,
      projectId: project_id,
      privateKey: private_key,
    }),
  });

  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // GlobalPipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) => new BadRequestException(errors),
    }),
  );

  app.useGlobalFilters(new PrismaExceptionFilter());

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Food pro no.1')
    .addBearerAuth(undefined, 'defaultBearerAuth')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: {
      authAction: {
        defaultBearerAuth: {
          name: 'defaultBearerAuth',
          schema: {
            description: 'Default',
            type: 'http',
            in: 'header',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
          value:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDQ3ODgzNjF9.VRHyst9b9t0NK4ZPODi20UEVNV1iObNl0w1Yoc2NDnw',
        },
      },
    },
  });

  await app.listen(3001);
}
bootstrap();
