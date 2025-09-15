import { CreateProjetosDto } from "src/projetos/dto/create-projetos.dto"
import { ProjetosEntity } from "src/projetos/entities/projetos.entity"

export class OwnerEntity {
    email: string
    name: string
    projetos: ProjetosEntity[]
    createdAt: Date
    updatedAt: Date
}