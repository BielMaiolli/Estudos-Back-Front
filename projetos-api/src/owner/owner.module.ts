import { Module } from '@nestjs/common';
import { OwnerController } from './owner.controller';
import { OwnerService } from './owner.service';
import { OwnerRepository } from 'src/repository/owner-repository.interface';
import { OwnerRepositoryPrisma } from 'src/repository/owner-repository.prisma';

@Module({
    controllers: [OwnerController],
    exports: [OwnerService],
    providers: [OwnerService,
        {
            provide: 'OwnerRepository',
            useClass: OwnerRepositoryPrisma,
        },
    ],
})

export class OwnerModule {}
