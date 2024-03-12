import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDistrictDto } from 'src/dtos/district/create-district.dtp';
import { UpdateDistrictDto } from 'src/dtos/district/update-district.dtp';
import { District, DistrictDocument } from 'src/schemas/district/district.schema';
import { Commune, CommuneDocument } from 'src/schemas/commune/commune.schema';

@Injectable()
export class DistrictService {
    constructor(
        @InjectModel(District.name) private readonly districtModel: Model<DistrictDocument>,
        @InjectModel(Commune.name) private readonly communeModel: Model<CommuneDocument>
    ) { }

    async create(createDistrictDto: CreateDistrictDto): Promise<DistrictDocument> {
        const commune = await this.communeModel.findOne({ name: { $regex: new RegExp(`^${createDistrictDto.communeName}$`, 'i') } });
        if (!commune) {
            throw new Error('This commune doesn\'t exist !');
        }

        const existingDistrict = await this.districtModel.findOne({ name: { $regex: new RegExp(`^${createDistrictDto.name}$`, 'i') } })
        if (existingDistrict) {
            throw Error('This district already exists !');
        }

        const districts = await this.districtModel.find({ communeId: commune._id });
        if (districts.length == commune.nbDistrict) {
            throw new Error('The number of districts linked to this commune has reached its limit !');
        }

        const newdistrict = new this.districtModel({
            ...createDistrictDto,
            communeId: commune._id,
        });
        return newdistrict.save();
    }

    async findAll(): Promise<DistrictDocument[]> {
        return this.districtModel.find().populate('communeId').exec();
    }

    async findOne(name: string) {
        return this.districtModel.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
    }

    async update(name: string, updateDistrictDto: UpdateDistrictDto) {
        const commune = await this.communeModel.findOne({ name: { $regex: new RegExp(`^${updateDistrictDto.communeName}$`, 'i') } });
        if (!commune) {
            throw new Error('This commune doesn\'t exist !');
        }
        return this.districtModel.findOneAndUpdate({ name: { $regex: new RegExp(`^${name}$`, 'i') } }, { ...updateDistrictDto, communeId: commune._id });
    }

    async remove(name: string) {
        return this.districtModel.findOneAndDelete({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
    }

}
