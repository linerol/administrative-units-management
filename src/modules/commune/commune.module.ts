import { Module } from '@nestjs/common';
import { CommuneController } from 'src/services/commune/commune.controller';
import { CommuneService } from 'src/services/commune/commune.service';
import { Commune, CommuneSchema } from 'src/schemas/commune/commune.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { DepartmentModule } from '../department/department.module';

@Module({
    imports: [MongooseModule.forFeature([
        {
            name: Commune.name,
            schema: CommuneSchema
        }
    ]),
        DepartmentModule
    ],
    controllers: [CommuneController],
    providers: [CommuneService],
    exports: [MongooseModule]
})
export class CommuneModule { }
