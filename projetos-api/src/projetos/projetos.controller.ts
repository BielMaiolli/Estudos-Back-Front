import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Projetos } from '@prisma/client';
import { UpdateProjetosDto } from './dto/update-projetos.dto';
import { ProjetosService } from './projetos.service';
import { CreateProjetosDto } from './dto/create-projetos.dto';

@Controller('projetos')
export class ProjetosController {
  constructor(private readonly projetosService: ProjetosService) {}

  @Post()
  async create(@Body() createProjetosDto: CreateProjetosDto): Promise<Projetos> {
    return this.projetosService.create(createProjetosDto);
  }

  @Get()
  async findAll(): Promise<Projetos[]> {
    return this.projetosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Projetos> {
    return this.projetosService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProjetosDto: UpdateProjetosDto): Promise<Projetos> {
    return this.projetosService.update(id, updateProjetosDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.projetosService.remove(id);
  }
}
