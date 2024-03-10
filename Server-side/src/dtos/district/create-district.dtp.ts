import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateDistrictDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    readonly description: string;

    @IsString()
    @IsNotEmpty()
    readonly communeName: string;
}