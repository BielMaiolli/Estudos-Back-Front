import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { Owner } from '@prisma/client';
import { UpdateOwnerDto } from './dto/update-owner.dto';

@Controller('owner')
export class OwnerController {
    constructor(private readonly ownerService: OwnerService) {}

    @Post()
    async create(@Body() createOwnerDto: CreateOwnerDto): Promise<Owner> {
        return this.ownerService.create(createOwnerDto);
    }

    @Get()
    async findAll(): Promise<Owner[]> {
        return this.ownerService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Owner> {
        return this.ownerService.findOne(id);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() udateOwnerDto: UpdateOwnerDto): Promise<Owner> {
        return this.ownerService.update(id, udateOwnerDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        await this.ownerService.remove(id);
    }




}
