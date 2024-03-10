import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type DistrictDocument = HydratedDocument<District>

@Schema()
export class District {

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    communeName: string;

    @Prop({ type: Types.ObjectId, ref: 'Commune', required: true })
    communeId: Types.ObjectId;

}

export const DistrictSchema = SchemaFactory.createForClass(District);