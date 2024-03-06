import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type DepartmentDocument = HydratedDocument<Department>

@Schema()
export class Department {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    nb_commune: number;

    @Prop({ required: true })
    nb_district: number;

}

export const DepartmentSchema = SchemaFactory.createForClass(Department);
