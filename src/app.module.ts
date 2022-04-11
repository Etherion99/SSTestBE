import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TableModule } from './table/table.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://etherion:Attp141215@sentinel.uejxd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'), 
    TableModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
