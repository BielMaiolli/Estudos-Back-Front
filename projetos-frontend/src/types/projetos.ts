export interface Projetos {
    id: string,
    name: string,
    cost: number,
    ownerId: string,
}

export interface CreateProjetosDto {
    name: string,
    cost: number,
    ownerId: string,
}

export interface UpdateProjetosDto {
    name: string,
    cost: number,
    ownerId: string,
}

export interface ApiResponse<T> {
    data: T;
    message?: string;
}