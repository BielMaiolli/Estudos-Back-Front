import { PrismaService } from "src/prisma/prisma.service";
import { ProjetosRepository } from "./projetos-repository.interface";
import { Projetos } from "@prisma/client";
import { Injectable } from "@nestjs/common";
import { CreateProjetosDto } from "src/projetos/dto/create-projetos.dto";
import { UpdateProjetosDto } from "src/projetos/dto/update-projetos.dto";

@Injectable()
export class ProjetosRepositoryPrisma implements ProjetosRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findAall(): Promise<Projetos[]> {
        return this.prisma.projetos.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }

    async findById(id: string): Promise<Projetos | null> {
        return this.prisma.projetos.findUnique({
            where: { id },
        });
    }

    async create(createProjetosDto: CreateProjetosDto): Promise<Projetos> {
        return this.prisma.projetos.create({
            data: createProjetosDto,
        });
    }

    async update(id: string, updateProjetosDto: UpdateProjetosDto): Promise<Projetos | null> {
        try {
            return await this.prisma.projetos.update({
                where: { id },
                data: updateProjetosDto,
            });
        } catch (error) {
            return null;
        }
    }

    async remove(id: string): Promise<Projetos | null> {
        try {
            return await this.prisma.projetos.delete({
                where: { id },
            });
        } catch (error) {
            return null;
        }
    }
}