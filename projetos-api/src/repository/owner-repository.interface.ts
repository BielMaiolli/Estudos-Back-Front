import { Owner } from "@prisma/client";
import { CreateOwnerDto } from "src/owner/dto/create-owner.dto";
import { UpdateOwnerDto } from "src/owner/dto/update-owner.dto";

export abstract class OwnerRepository {

    abstract findAall(): Promise<Owner[]>;
    abstract findById(id: string): Promise<Owner | null>;
    abstract create(createOwnerDto: CreateOwnerDto): Promise<Owner>;
    abstract update(id: string, updateOwnerDto: UpdateOwnerDto): Promise<Owner | null>;
    abstract remove(id: string): Promise<Owner | null>;
}