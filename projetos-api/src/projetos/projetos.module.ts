import { Module } from '@nestjs/common';
import { ProjetosService } from './projetos.service';
import { ProjetosController } from './projetos.controller';
import { ProjetosRepository } from 'src/repository/projetos-repository.interface';
import { ProjetosRepositoryPrisma } from 'src/repository/projetos-repository.prisma';

@Module({
  providers: [ProjetosService,
    {
      provide: 'ProjetosRepository',
      useClass: ProjetosRepositoryPrisma,
    },
  ],
  exports: [ProjetosService],
  controllers: [ProjetosController]
})

export class ProjetosModule {}
