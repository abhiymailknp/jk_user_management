import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpException, HttpStatus, INestApplication, ValidationError, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SWAGGER_CONSTANTS } from './constants/constants';
import * as dotenv from 'dotenv';
dotenv.config();

class Server{
  static async bootstrap():Promise<Server>{
    const app = await NestFactory.create(AppModule);
    const server = new Server(app);
    server.setupSwagger();
    return server;
  }
  constructor(public app: INestApplication) {
    app.enableCors();
    app.useGlobalPipes(
      new ValidationPipe({
        exceptionFactory: (errors: ValidationError[]) => {
          const error = errors[0];
          return new HttpException(
            {
              statusCode: HttpStatus.BAD_REQUEST,
              message: 'Bad Request',
              errors: Object.values(error?.constraints || {}),
            },
            HttpStatus.BAD_REQUEST,
          );
        },
      }),
    );
  }

  setupSwagger() {
    const builder = new DocumentBuilder()
      .setTitle(SWAGGER_CONSTANTS.swagger.title)
      .setDescription(SWAGGER_CONSTANTS.swagger.description)
      .setVersion(SWAGGER_CONSTANTS.swagger.version)
      .addTag(SWAGGER_CONSTANTS.swagger.tag)
      .addBearerAuth()
      .addBasicAuth()
      .build();

    const document = SwaggerModule.createDocument(this.app, builder);
    SwaggerModule.setup('/docs', this.app, document);
  }

  async start() {
    const port = process.env.PORT || 3000;
    console.log(`Environment: ${process.env.PORT}`);
    await this.app.listen(port);
    console.info(`Server running on ${port}`);
  }
}

Server.bootstrap().then((server) => {
  server.start();
}).catch((e) => console.error(e));