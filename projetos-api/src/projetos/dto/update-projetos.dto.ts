import { PartialType } from "@nestjs/swagger";
import { CreateProjetosDto } from "./create-projetos.dto";

export class UpdateProjetosDto extends PartialType(CreateProjetosDto) {}