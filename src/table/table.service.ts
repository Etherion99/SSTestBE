import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TableType } from './interfaces/table-type.interface';
import { Model } from 'mongoose';
import { CreateTableTypeDTO } from './dto/table-type.dto';
import { CreateTableStructureDTO } from './dto/table-structure.dto';
import { TableStructure } from './interfaces/table-structure.interface';

@Injectable()
export class TableService {

    constructor(@InjectModel('TableType') private tableTypeModel: Model<TableType>){}

    //Table Types
    async getTableTypes(): Promise<TableType[]>{
        const tableTypes = await this.tableTypeModel.find();

        return tableTypes;
    }

    async createTableTypes(createTableTypeDTO: CreateTableTypeDTO): Promise<TableType>{
        const tableType = new this.tableTypeModel(createTableTypeDTO);
        return tableType.save();
    }

    async updateTableTypes(id: string, createTableTypeDTO: CreateTableTypeDTO){
        const updated = await this.tableTypeModel.findByIdAndUpdate(id, createTableTypeDTO, { new: true });
        return updated;
    }

    async removeTableTypes(id: string): Promise<TableType>{
        const deleted = await this.tableTypeModel.findByIdAndDelete(id);
        return deleted
    }

    //Table Structures
    async getTableStructures(typeId: string): Promise<TableStructure[]>{
        const tableTypes = await this.tableTypeModel.findById(typeId);

        return tableTypes.columns;
    }

    async createTableStructures(typeId: string, createTableStructureDTO: CreateTableStructureDTO): Promise<TableType>{
        const tableType = await this.tableTypeModel.findByIdAndUpdate(
            typeId,
            { $push: { columns: createTableStructureDTO } },
            { new: true }
        );
        return tableType;
    }

    async updateTableStructures(id: string, createTableStructureDTO: CreateTableStructureDTO): Promise<TableType>{
        const columnData = {};
        Object.keys(createTableStructureDTO).forEach(k => columnData[`columns.$.${k}`] = createTableStructureDTO[k]);

        const tableType = await this.tableTypeModel.findOneAndUpdate(
            { "columns._id": id },
            { $set: columnData },
            { new: true }
        );
        return tableType;
    }

    async removeTableStructures(typeId:string, id: string): Promise<TableType>{
        const columnData = {};

        const tableType = await this.tableTypeModel.findByIdAndUpdate(
            typeId,
            { 
                "$pull": { 
                    "columns": { "_id": id } 
                } 
            },
            { new: true }
        );

        return tableType;
    }

    //Table Data
    async getTableData(typeId: string): Promise<any[]>{
        const tableData = await this.tableTypeModel.findById(typeId);

        return tableData.data;
    }

    async createTableData(typeId: string, data: any): Promise<TableType>{
        const tableType = await this.tableTypeModel.findByIdAndUpdate(
            typeId,
            { $push: { data } },
            { new: true }
        );
        return tableType;
    }

    async updateTableData(id: string, data: any): Promise<TableType>{
        const tableData = {};
        Object.keys(data).forEach(k => tableData[`data.$.${k}`] = data[k]);

        const tableType = await this.tableTypeModel.findOneAndUpdate(
            { "data._id": id },
            { $set: tableData },
            { new: true }
        );
        return tableType;
    }

    async removeTableData(typeId:string, id: string): Promise<TableType>{
        const columnData = {};

        const tableType = await this.tableTypeModel.findByIdAndUpdate(
            typeId,
            { 
                "$pull": { 
                    "data": { "_id": id } 
                } 
            },
            { new: true }
        );

        return tableType;
    }
}
