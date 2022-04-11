import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { CreateTableStructureDTO } from './dto/table-structure.dto';
import { CreateTableTypeDTO } from './dto/table-type.dto';
import { TableService } from './table.service';

@Controller('table')
export class TableController {

    constructor(private tableService: TableService){  }

    //types
    @Get('/types/all')
    async getTableTypes(@Res() res){
        const tableTypes = await this.tableService.getTableTypes();

        return res.status(HttpStatus.OK).json({
            tableTypes: tableTypes
        });
    }

    @Post('/types/create')
    async createTableType(@Res() res, @Body() createTableTypeDTO: CreateTableTypeDTO){
        const tableType = await this.tableService.createTableTypes(createTableTypeDTO);

        return res.status(HttpStatus.OK).json({
            tableType: tableType
        });
    }

    @Put('/types/update/:id')
    async updateTableType(@Res() res, @Param('id') id, @Body() createTableTypeDTO: CreateTableTypeDTO){
        const tableType = await this.tableService.updateTableTypes(id, createTableTypeDTO);

        return res.status(HttpStatus.OK).json({
            tableType: tableType
        });
    }

    @Delete('/types/delete/:id')
    async deleteTableType(@Res() res, @Param('id') id){
        const tableType = await this.tableService.removeTableTypes(id);

        return res.status(HttpStatus.OK).json({
            tableType: tableType
        });
    }

    //structures
    @Get('/structures/all/:typeId')
    async getTableStructures(@Res() res, @Param('typeId') typeId){
        const tableStructure = await this.tableService.getTableStructures(typeId);

        return res.status(HttpStatus.OK).json({
            tableStructure: tableStructure
        });
    }

    @Post('/structures/create/:typeId')
    async createTableStructure(@Res() res, @Param('typeId') typeId, @Body() createTableStructureDTO: CreateTableStructureDTO){
        const tableStructure = await this.tableService.createTableStructures(typeId, createTableStructureDTO);

        return res.status(HttpStatus.OK).json({
            tableStructure: tableStructure
        });
    }

    @Put('/structures/update/:id')
    async updateTableStructure(@Res() res, @Param('id') id, @Body() createTableStructureDTO: CreateTableStructureDTO){
        const tableStructure = await this.tableService.updateTableStructures(id, createTableStructureDTO);

        return res.status(HttpStatus.OK).json({
            tableStructure: tableStructure
        });
    }

    @Delete('/structures/delete/:typeId/:id')
    async deleteTableStructure(@Res() res, @Param('typeId') typeId, @Param('id') id){
        const tableStructure = await this.tableService.removeTableStructures(typeId, id);

        return res.status(HttpStatus.OK).json({
            tableStructure: tableStructure
        });
    }

    //data
    @Get('/data/all/:typeId')
    async getTableData(@Res() res, @Param('typeId') typeId){
        const tableData = await this.tableService.getTableData(typeId);

        return res.status(HttpStatus.OK).json({
            tableData
        });
    }

    @Post('/data/create/:typeId')
    async createTableData(@Res() res, @Param('typeId') typeId, @Body() data: any){
        const tableData = await this.tableService.createTableData(typeId, data);

        return res.status(HttpStatus.OK).json({
            tableData
        });
    }

    @Put('/data/update/:id')
    async updateTableData(@Res() res, @Param('id') id, @Body() data: any){
        const tableData = await this.tableService.updateTableData(id, data);

        return res.status(HttpStatus.OK).json({
            tableData
        });
    }

    @Delete('/data/delete/:typeId/:id')
    async deleteTableData(@Res() res, @Param('typeId') typeId, @Param('id') id){
        const tableData = await this.tableService.removeTableData(typeId, id);

        return res.status(HttpStatus.OK).json({
            tableData
        });
    }
}
