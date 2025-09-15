import { Projetos } from "@prisma/client";
import { CreateProjetosDto } from "src/projetos/dto/create-projetos.dto";
import { UpdateProjetosDto } from "src/projetos/dto/update-projetos.dto";

export abstract class ProjetosRepository {

    abstract findAall(): Promise<Projetos[]>;
    abstract findById(id: string): Promise<Projetos | null>;
    abstract create(createProjetosDto: CreateProjetosDto): Promise<Projetos>;
    abstract update(id: string, updateProjetosDto: UpdateProjetosDto): Promise<Projetos | null>;
    abstract remove(id: string): Promise<Projetos | null>;
}