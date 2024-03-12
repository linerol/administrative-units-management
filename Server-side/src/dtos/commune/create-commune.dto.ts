import { IsNotEmpty, IsNumber, IsString, IsUppercase } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCommuneDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly description: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly departmentName: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    readonly nbDistrict: number;

}