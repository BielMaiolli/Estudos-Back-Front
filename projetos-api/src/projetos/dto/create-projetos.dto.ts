import { Type } from "class-transformer"
import { IsDefined, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateProjetosDto {
    @IsString()
    @IsNotEmpty()
    @IsDefined()
    name: string

    @IsNumber()
    @Type(() => Number)
    @IsNotEmpty()
    @IsDefined()
    cost: number 
  
    @IsString()
    @IsDefined()
    @IsNotEmpty()
    ownerId: string
}