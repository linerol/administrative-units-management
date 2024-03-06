import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DepartmentModule } from './modules/department/department.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/benin'), DepartmentModule, 

],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
