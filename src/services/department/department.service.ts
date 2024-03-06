import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDepartmentDto } from '../../dtos/department/create-department.dto';
import { UpdateDepartmentDto } from '../../dtos/department/update-department.dto';
import { Department, DepartmentDocument } from '../../schemas/department/department.schema';

@Injectable()
export class DepartmentService {
    constructor(@InjectModel(Department.name) private readonly departmentModel: Model<DepartmentDocument>) { }

    async create(createDepartmentDto: CreateDepartmentDto): Promise<DepartmentDocument> {
        const department = new this.departmentModel(createDepartmentDto);
        return department.save();
    }

    async findAll(): Promise<DepartmentDocument[]> {
        return this.departmentModel.find().exec();
    }

    async findOne(id: string) {
        return this.departmentModel.findById(id);
    }

    async update(id: string, updateDepartmentDto: UpdateDepartmentDto) {
        return this.departmentModel.findByIdAndUpdate(id, updateDepartmentDto);
    }

    async remove(id: string) {
        return this.departmentModel.findByIdAndDelete(id);
    }
}

