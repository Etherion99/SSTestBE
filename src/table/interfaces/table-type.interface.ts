import { Document } from 'mongoose'
import { TableStructure } from './table-structure.interface';

export interface TableType extends Document{
    id: number;
    name: string;
    columns: TableStructure[],
    data: any[]
}