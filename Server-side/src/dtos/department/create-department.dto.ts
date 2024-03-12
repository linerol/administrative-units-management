import { IsNotEmpty, IsNumber, IsString, IsUppercase } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
// export class CreateDepartmentDto extends IDepartment

export class CreateDepartmentDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly description: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    readonly nbCommune: number;


}