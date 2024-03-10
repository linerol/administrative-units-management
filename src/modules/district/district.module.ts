
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { District, DistrictSchema } from 'src/schemas/district/district.schema';
import { CommuneModule } from '../commune/commune.module';
import { DistrictController } from 'src/services/district/district/district.controller';
import { DistrictService } from 'src/services/district/district.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: District.name,
                schema: DistrictSchema
            }
        ]),
        CommuneModule
    ],
    controllers: [DistrictController],
    providers: [DistrictService],
})
export class DistrictModule { }
