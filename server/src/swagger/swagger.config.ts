import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Blogs Api App')
  .setDescription('Blog Api that written in Nest Js')
  .setVersion('1.0')
  .addTag('Category')
  .addTag('Auth')
  .addTag('User')
  .addTag('Blogs')
  .addServer(`https://localhost:${process.env.PORT}/api/v1`)
  .addBearerAuth({
    scheme: 'bearer',
    bearerFormat: 'JWT',
    type: 'http',
  })
  .build();
