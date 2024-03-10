import { Document } from "mongoose";

export interface Idepartment extends Document {
    readonly name: string;
    readonly description: string;
    readonly nbCommune: number;
}
