import { Document } from "mongoose";
import { District } from "src/schemas/district/district.schema";

export interface Idistrict extends Document {
    readonly name: string;
    readonly description: string;
    readonly communeName: string;
}
