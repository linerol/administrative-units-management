import { PartialType } from "@nestjs/mapped-types";
import { CreateDistrictDto } from "./create-district.dtp";

export class UpdateDistrictDto extends PartialType(CreateDistrictDto) { }