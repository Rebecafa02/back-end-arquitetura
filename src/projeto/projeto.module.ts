import { Module } from '@nestjs/common';
import { ProjetoController } from './projeto.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjetoService } from './projeto.service';
import { Projeto, ProjetoSchema } from './schemas/projeto.schema';
import { Tarefa, TarefaSchema } from '../tarefa/schemas/tarefa.entity';
import {
  Subprojeto,
  SubprojetoSchema,
} from '../subprojeto/schemas/subprojeto.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Projeto.name, schema: ProjetoSchema },
      { name: Tarefa.name, schema: TarefaSchema },
      { name: Subprojeto.name, schema: SubprojetoSchema },
    ]),
  ],
  controllers: [ProjetoController],
  providers: [ProjetoService],
  exports: [ProjetoService],
})
export class ProjetoModule {}
