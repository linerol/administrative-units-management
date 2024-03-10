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
    nbCommune: number;

}

export const DepartmentSchema = SchemaFactory.createForClass(Department);
