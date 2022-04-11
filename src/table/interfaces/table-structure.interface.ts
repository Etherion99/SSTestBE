import { Document } from 'mongoose'

export interface TableStructure extends Document{
    id: Number;
    header: String;
    datatype: String;
    format: String;
    required: boolean;
}