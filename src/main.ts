import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT =  parseInt(process.env.PORT, 10) || 3000 ;
  const app = await NestFactory.create(AppModule);
  
  await app.listen(PORT, () => console.log(`Server started on ${process.env.PORT} port`));
}

bootstrap();
