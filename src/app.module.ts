import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import { ClienteModule } from './cliente/cliente.module';
import { TarefaModule } from './tarefa/tarefa.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/projetoArquitetura'),
    ClienteModule,
    TarefaModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
