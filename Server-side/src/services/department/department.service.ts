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
        const nameLowercase = createDepartmentDto.name.toLowerCase();

        const existingDepartment = await this.departmentModel.findOne({ name: { $regex: new RegExp(`^${nameLowercase}$`, 'i') } });

        if (existingDepartment) {
            throw new Error('This department already exists.');
        }

        const department = new this.departmentModel(createDepartmentDto);
        return department.save();
    }

    async findAll(): Promise<DepartmentDocument[]> {
        return this.departmentModel.find().exec();
    }

    async findOne(name: string) {
        return this.departmentModel.findOne({ name: { $regex: new RegExp(name, 'i') } });
    }

    async update(name: string, updateDepartmentDto: UpdateDepartmentDto) {
        return this.departmentModel.findOneAndUpdate({ name: { $regex: new RegExp(name, 'i') } }, updateDepartmentDto);
    }

    async remove(name: string) {
        return this.departmentModel.findOneAndDelete({ name: { $regex: new RegExp(name, 'i') } });
    }
}

