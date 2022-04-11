import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TableTypeSchema } from './schemas/table-type.schema';
import { TableController } from './table.controller';
import { TableService } from './table.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'TableType',
        schema: TableTypeSchema
      }
    ])
  ],
  controllers: [TableController],
  providers: [TableService]
})
export class TableModule {}
