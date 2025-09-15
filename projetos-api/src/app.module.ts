import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjetosModule } from './projetos/projetos.module';
import { OwnerModule } from './owner/owner.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ProjetosModule, OwnerModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
