import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const PORT =  parseInt(process.env.PORT, 10) || 3000 ;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Inovations store')
    .setDescription('REST API documentation')
    .setVersion('0.0.1')
    .addTag('inovations store')
    .build()

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document)
  
  await app.listen(PORT, () => console.log(`Server started on ${process.env.PORT} port`));
}

bootstrap();
