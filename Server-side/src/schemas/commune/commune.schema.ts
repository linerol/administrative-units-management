import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types     } from "mongoose";

export type CommuneDocument = HydratedDocument<Commune>

@Schema()
export class Commune {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    description: string;

    @Prop({required: true})
    departmentName: string;

    @Prop({ required: true })
    nbDistrict: number;

    @Prop({ type: Types.ObjectId, ref: 'Department', required: true})
    departmentId: Types.ObjectId;

}

export const CommuneSchema = SchemaFactory.createForClass(Commune);
