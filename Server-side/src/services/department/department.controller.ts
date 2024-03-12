import { Controller, Get, Post, Body, Param, Delete, Put, Res, HttpStatus } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from '../../dtos/department/create-department.dto';
import { UpdateDepartmentDto } from '../../dtos/department/update-department.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('department')
@Controller('department')
export class DepartmentController {
    constructor(private readonly departmentService: DepartmentService) { }

    @Post()
    async create(@Res() response, @Body() createDepartmentDto: CreateDepartmentDto) {
        try {
            const newDepartment = await this.departmentService.create(createDepartmentDto);
            return response.status(HttpStatus.CREATED).json({
                message: 'Department created successfuly !',
                newDepartment,
            });

        } catch (err) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                message: 'Error: Department not created!',
                error: 'Bad request',
            });

        }
    }

    @Get()
    findAll() {
        return this.departmentService.findAll();
    }

    @Get(':name')
    findOne(@Param('name') name: string) {
        return this.departmentService.findOne(name);
    }

    @Put(':name')
    update(@Param('name') name: string, @Body() updateDepartmentDto: UpdateDepartmentDto) {
        return this.departmentService.update(name, updateDepartmentDto);
    }

    @Delete(':name')
    remove(@Param('name') name: string) {
        return this.departmentService.remove(name);
    }
}
