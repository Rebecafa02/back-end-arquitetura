import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import { ClienteModule } from './cliente/cliente.module';
import { TarefaModule } from './tarefa/tarefa.module';
import { SubprojetoModule } from './subprojeto/subprojeto.module';
import { ProjetoModule } from './projeto/projeto.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/projetoArquitetura'),
    ClienteModule,
    TarefaModule,
    SubprojetoModule,
    ProjetoModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
