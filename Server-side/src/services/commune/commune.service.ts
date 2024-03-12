import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCommuneDto } from '../../dtos/commune/create-commune.dto';
import { UpdateCommuneDto } from '../../dtos/commune/update-commune.dto';
import { Commune, CommuneDocument } from '../../schemas/commune/commune.schema';
import { Department, DepartmentDocument } from '../../schemas/department/department.schema';

@Injectable()
export class CommuneService {
    constructor(
        @InjectModel(Commune.name) private readonly communeModel: Model<CommuneDocument>,
        @InjectModel(Department.name) private readonly departmentModel: Model<DepartmentDocument>
    ) { }

    async create(createCommuneDto: CreateCommuneDto): Promise<CommuneDocument> {
        const department = await this.departmentModel.findOne({ name: { $regex: new RegExp(`^${createCommuneDto.departmentName}$`, 'i') } });
        if (!department) {
            throw new Error('This department doesn\'t exist !');
        }

        const existingCommune = await this.communeModel.findOne({ name: { $regex: new RegExp(`^${createCommuneDto.name}$`, 'i') } });

        if (existingCommune) {
            throw Error('This commune already exists !')
        }

        const communes = await this.communeModel.find({ departmentId: department._id });
        if (communes.length == department.nbCommune) {
            throw new Error('The number of communes linked to this department has reached its limit !');
        }

        const commune = new this.communeModel({
            ...createCommuneDto,
            departmentId: department._id,
        });
        return commune.save();
    }

    async findAll(): Promise<CommuneDocument[]> {
        return this.communeModel.find().populate('departmentId').exec();
    }

    async findOne(id: string) {
        return this.communeModel.findById(id).populate('departmentId');
    }

    async update(name: string, updateCommuneDto: UpdateCommuneDto) {
        const department = await this.departmentModel.findOne({ name: { $regex: new RegExp(`^${updateCommuneDto.departmentName}$`, 'i') } });
        if (!department) {
            throw new Error('This department doesn\'t exist !');
        }
        return this.communeModel.findOneAndUpdate({ name: { $regex: new RegExp(`^${name}$`, 'i') } }, { ...updateCommuneDto, departmentId: department._id });
    }

    async remove(name: string) {
        return this.communeModel.findOneAndDelete({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
    }
}
