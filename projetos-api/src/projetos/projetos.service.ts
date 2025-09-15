import { Inject, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { ProjetosRepository } from 'src/repository/projetos-repository.interface';
import { CreateProjetosDto } from './dto/create-projetos.dto';
import { Projetos } from '@prisma/client';
import { retry } from 'rxjs';
import { UpdateProjetosDto } from './dto/update-projetos.dto';

@Injectable()
export class ProjetosService {

    constructor(
        @Inject('ProjetosRepository')
        private readonly projetosRepository: ProjetosRepository) {}

    async create(createProjetosDto: CreateProjetosDto): Promise<Projetos> {
        return this.projetosRepository.create(createProjetosDto);
    }

    async findAll(): Promise<Projetos[]> {
        return this.projetosRepository.findAall();
    }

    async findOne(id: string): Promise<Projetos> {
        const projetos = await this.projetosRepository.findById(id);
        
        if (!projetos) {
            throw new NotFoundException(`O projeto com o Id ${id} não foi encontrado`);
        }
        
        return projetos;
    }

    async update(id: string, updateProjetosDto: UpdateProjetosDto): Promise<Projetos> {
        const projetos = await this.projetosRepository.update(id, updateProjetosDto);

        if (!projetos) {
            throw new NotFoundException(`O projeto com Id ${id} não foi encontrado.`);
        }

        return projetos;
    }

    async remove(id: string): Promise<Projetos> {
        const projetos = await this.projetosRepository.remove(id);

        if (!projetos) {
            throw new NotFoundException(`O projeto com Id ${id} não foi encontrado.`);
        }

        return projetos;
    }
}
