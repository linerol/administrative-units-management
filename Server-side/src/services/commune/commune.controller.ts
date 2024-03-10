import { Controller, Get, Post, Body, Param, Delete, Put, Res, HttpStatus } from '@nestjs/common';
import { CreateCommuneDto } from 'src/dtos/commune/create-commune.dto';
import { UpdateCommuneDto } from 'src/dtos/commune/update-commune.dto';
import { CommuneService } from './commune.service';

@Controller('commune')
export class CommuneController {
    constructor(private readonly communeService: CommuneService) { }

    @Post()
    async create(@Res() response, @Body() createCommuneDto: CreateCommuneDto) {
        try {
            const newCommune = await this.communeService.create(createCommuneDto);
            return response.status(HttpStatus.CREATED).json({
                message: 'Commune created successfuly !',
                newCommune,
            });
        } catch(err) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                message: 'Error: Commune not created!',
                error: 'Bad request',
            });
        }
    }

    
    @Get()
    findAll() {
        return this.communeService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.communeService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateCommuneDto: UpdateCommuneDto) {
        return this.communeService.update(id, updateCommuneDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.communeService.remove(id);
    }

}
