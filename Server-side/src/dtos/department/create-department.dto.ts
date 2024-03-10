import { IsNotEmpty, IsNumber, IsString, IsUppercase } from "class-validator";

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
    readonly nbCommune: number;


}