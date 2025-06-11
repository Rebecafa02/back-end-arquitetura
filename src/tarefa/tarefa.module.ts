import { Module } from '@nestjs/common';
import { TarefaService } from './tarefa.service';
import { TarefaController } from './tarefa.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Tarefa, TarefaSchema } from './schemas/tarefa.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tarefa.name, schema: TarefaSchema }]),
  ],
  controllers: [TarefaController],
  providers: [TarefaService],
})
export class TarefaModule {}
