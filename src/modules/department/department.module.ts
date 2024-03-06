import { Module } from '@nestjs/common';
import { DepartmentController } from 'src/services/department/department.controller';
import { DepartmentService } from 'src/services/department/department.service';
import { Department, DepartmentSchema } from 'src/schemas/department/department.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [MongooseModule.forFeature([
        {
            name: Department.name,
            schema: DepartmentSchema
        }
    ])
    ],
    controllers: [DepartmentController],
    providers: [DepartmentService]
})
export class DepartmentModule {}
