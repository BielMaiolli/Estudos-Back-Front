import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { OwnerRepository } from 'src/repository/owner-repository.interface';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { Owner } from '@prisma/client';
import { UpdateOwnerDto } from './dto/update-owner.dto';

@Injectable()
export class OwnerService {
    
    constructor(
        @Inject('OwnerRepository')
        private readonly ownerRepository: OwnerRepository) {}

    async create(createOwnerDto: CreateOwnerDto): Promise<Owner> {
        return this.ownerRepository.create(createOwnerDto);
    }
    
    async findAll(): Promise<Owner[]> {
        return this.ownerRepository.findAall();
    } 

    async findOne(id: string): Promise<Owner> {
        const owner = await this.ownerRepository.findById(id);

        if(!owner) {
            throw new NotFoundException(`O Owner com o Id ${id} não foi encontrado.`)
        }

        return owner;
    }

    async update(id: string, updateOwnerDto: UpdateOwnerDto): Promise<Owner> {
        const owner = await this.ownerRepository.update(id, updateOwnerDto);

        if(!owner) {
                throw new NotFoundException(`O Owner com o Id ${id} não foi encontrado.`)
        }

        return owner;
    }

    async remove(id: string): Promise<Owner> {
        const owner = await this.ownerRepository.remove(id);

        if(!owner) {
            throw new NotFoundException(`O Owner com o Id ${id} não foi encontrado.`)
        }

        return owner;
    }
    
}
