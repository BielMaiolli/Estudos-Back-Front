import { Injectable } from "@nestjs/common";
import { Owner } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { OwnerRepository } from "./owner-repository.interface";
import { CreateOwnerDto } from "src/owner/dto/create-owner.dto";
import { UpdateOwnerDto } from "src/owner/dto/update-owner.dto";

@Injectable()
export class OwnerRepositoryPrisma implements OwnerRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findAall(): Promise<Owner[]> {
        return this.prisma.owner.findMany({
            orderBy: { createdAt: 'desc' },
            include: { projetos: true }
        });
    }

    async findById(id: string): Promise<Owner | null> {
        return this.prisma.owner.findUnique({
            where: { id },
        });
    }

    async create(createOwnerDto: CreateOwnerDto): Promise<Owner> {
        return this.prisma.owner.create({
            data: {
                email: createOwnerDto.email,
                name: createOwnerDto.name,
                projetos: createOwnerDto.projetos
                ? { create: createOwnerDto.projetos }
                : undefined,
            }
        });
    }

    async update(id: string, updateOwnerDto: UpdateOwnerDto): Promise<Owner | null> {
        try {
            return await this.prisma.owner.update({
                where: { id },
                data: {
                    email: updateOwnerDto.email,
                    name: updateOwnerDto.name,
                    projetos: updateOwnerDto.projetos
                    ? { create: updateOwnerDto.projetos }
                    : undefined,
                }
            });
        } catch (error) {
            return null;
        }
    }

    async remove(id: string): Promise<Owner | null> {
        try {
            return await this.prisma.owner.delete({
                where: { id },
            });
        } catch (error) {
            return null;
        }
    }
}