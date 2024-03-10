import { Document } from "mongoose";
import { Department } from "src/schemas/department/department.schema";

export interface Icommune extends Document {
    readonly name: string;
    readonly description: string;
    readonly departmentName: string;

}
