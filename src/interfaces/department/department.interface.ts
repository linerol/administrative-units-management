import { Document } from "mongoose";

export interface Idepartment extends Document {
    readonly name: string;
    readonly description: string;
    readonly nb_commune: number;
    readonly nb_district: number;
}
