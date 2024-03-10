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

    async findOne(id: string) {
        return this.districtModel.findById(id).populate('communeId');
    }

    async update(id: string, updateDistrictDto: UpdateDistrictDto) {
        const commune = await this.communeModel.findOne({ name: { $regex: new RegExp(`^${updateDistrictDto.communeName}$`, 'i') } });
        if (!commune) {
            throw new Error('This commune doesn\'t exist !');
        }
        return this.districtModel.findByIdAndUpdate(id, { ...updateDistrictDto, communeId: commune._id });
    }

    async remove(id: string) {
        return this.districtModel.findByIdAndDelete(id);
    }

}
