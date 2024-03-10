import { Controller, Get, Post, Body, Param, Delete, Put, Res, HttpStatus  } from '@nestjs/common';
import { DistrictService } from '../district.service';
import { CreateDistrictDto } from 'src/dtos/district/create-district.dtp';
import { UpdateDistrictDto } from 'src/dtos/district/update-district.dtp';

@Controller('district')
export class DistrictController {
    constructor(private readonly districtService: DistrictService) { }

    @Post()
    async create(@Res() response, @Body() createDistrictDto: CreateDistrictDto) {
        try {
            const newDistrict = await this.districtService.create(createDistrictDto);
            return response.status(HttpStatus.CREATED).json({
                message: 'District created successfuly !',
                newDistrict,
            });
        } catch(err) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                message: 'Error: District not created!',
                error: 'Bad request',
            });
        }
    }

    
    @Get()
    findAll() {
        return this.districtService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.districtService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateDistrictDto: UpdateDistrictDto) {
        return this.districtService.update(id, updateDistrictDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.districtService.remove(id);
    }


}
