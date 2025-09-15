import type { CreateProjetosDto, Projetos } from "./projetos";

export interface Owner {
    id: string,
    email: string,
    name: string,
    projetos?: Projetos[],
}

export interface CreateOwnerDto {
    email: string,
    name: string,
    projetos?: CreateProjetosDto[],
}

export interface UpdateOwnerDto {
    email: string,
    name: string,
    projetos?: CreateProjetosDto[]
}

export interface ApiResponse<T> {
    data: T;
    message?: string;
}