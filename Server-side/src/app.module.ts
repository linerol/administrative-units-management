import { DistrictModule } from './modules/district/district.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DepartmentModule } from './modules/department/department.module';
import { CommuneModule } from './modules/commune/commune.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/benin'),
    DepartmentModule, CommuneModule, DistrictModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
