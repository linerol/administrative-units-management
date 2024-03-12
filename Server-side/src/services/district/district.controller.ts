import { Controller, Get, Post, Body, Param, Delete, Put, Res, HttpStatus } from '@nestjs/common';
import { DistrictService } from './district.service';
import { CreateDistrictDto } from 'src/dtos/district/create-district.dtp';
import { UpdateDistrictDto } from 'src/dtos/district/update-district.dtp';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('district')
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
        } catch (err) {
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

    @Get(':name')
    findOne(@Param('name') name: string) {
        return this.districtService.findOne(name);
    }

    @Put(':name')
    update(@Param('name') name: string, @Body() updateDistrictDto: UpdateDistrictDto) {
        return this.districtService.update(name, updateDistrictDto);
    }

    @Delete(':name')
    remove(@Param('name') name: string) {
        return this.districtService.remove(name);
    }

}
