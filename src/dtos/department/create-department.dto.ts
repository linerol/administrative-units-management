import { Idepartment } from "src/interfaces/department/department.interface";
import { IsNotEmpty, IsNumber, isNumber, IsString, MaxLength } from "class-validator";

// export class CreateDepartmentDto extends IDepartment

export class CreateDepartmentDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    readonly description: string;

    @IsNumber()
    @IsNotEmpty()
    readonly nb_commune: number;

    @IsNumber()
    @IsNotEmpty()
    readonly nb_district: number;

}