import { CreateTableStructureDTO } from "./table-structure.dto";

export class CreateTableTypeDTO{
    id: Number;
    name: String;
    columns: [{
        id: Number;
        header: String;
        datatype: String;
        format: String;
        required: boolean;
    }];
    data: any[];
}