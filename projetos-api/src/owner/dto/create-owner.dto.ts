import { Type } from "class-transformer"
import { IsArray, IsDefined, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator"
import { CreateProjetosDto } from "src/projetos/dto/create-projetos.dto"

export class CreateOwnerDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  email: string

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  name: string 

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateProjetosDto)
  projetos?: CreateProjetosDto[]
}

