import  { PartialType } from "@nestjs/swagger";
import { CreateDistrictDto } from "./create-district.dtp";

export class UpdateDistrictDto extends PartialType(CreateDistrictDto) { }