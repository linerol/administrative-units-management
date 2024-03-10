import { IsNotEmpty, IsNumber, IsString, IsUppercase } from "class-validator";
import { Department } from "src/schemas/department/department.schema";
import { Types } from "mongoose";

export class CreateCommuneDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    readonly description: string;

    @IsNotEmpty()
    @IsString()
    readonly departmentName: string;

    @IsNumber()
    @IsNotEmpty()
    readonly nbDistrict: number;

}