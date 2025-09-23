import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // --- BLOCO DE DEBUG PARA ADICIONAR ---
  console.log("--- INICIANDO DEBUG DE VARIÁVEIS DE AMBIENTE ---");
  console.log("PORTA RECEBIDA:", process.env.PORT);
  console.log("DB_HOST RECEBIDO:", process.env.DB_HOST);
  console.log("DB_USER RECEBIDO:", process.env.DB_USER);
  console.log("DB_NAME RECEBIDO:", process.env.DB_NAME);
  // Apenas verificamos se a senha existe, para não expô-la nos logs
  console.log("DB_PASSWORD EXISTE?:", !!process.env.DB_PASSWORD); 
  console.log("--- FIM DO DEBUG ---");
  // --- FIM DO BLOCO DE DEBUG ---

  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();