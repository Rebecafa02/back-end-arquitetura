import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ProjetoDocument = Projeto & Document;

export enum StatusProjeto {
  PLANEJAMENTO = 'PLANEJAMENTO',
  EM_ANDAMENTO = 'EM_ANDAMENTO',
  PAUSADO = 'PAUSADO',
  CONCLUIDO = 'CONCLUIDO',
  CANCELADO = 'CANCELADO',
}

export enum StatusTarefaProjeto {
  NAO_INICIADA = 'NAO_INICIADA',
  EM_ANDAMENTO = 'EM_ANDAMENTO',
  CONCLUIDA = 'CONCLUIDA',
  ATRASADA = 'ATRASADA',
  CANCELADA = 'CANCELADA',
}

@Schema()
export class TarefaProjetoInfo {
  @Prop({ type: Types.ObjectId, ref: 'Tarefa', required: true })
  tarefaId: Types.ObjectId;

  @Prop({ required: true })
  dataInicio: Date;

  @Prop({ required: true })
  dataFimPrevista: Date;

  @Prop()
  dataFimReal?: Date;

  @Prop({
    required: true,
    enum: StatusTarefaProjeto,
    default: StatusTarefaProjeto.NAO_INICIADA,
  })
  status: StatusTarefaProjeto;

  @Prop({ default: '' })
  observacoes: string;
}

@Schema()
export class SubprojetoProjeto {
  @Prop({ type: Types.ObjectId, ref: 'Subprojeto', required: true })
  subprojetoId: Types.ObjectId;

  @Prop({ type: [TarefaProjetoInfo], default: [] })
  tarefas: TarefaProjetoInfo[];
}

@Schema()
export class Projeto {
  @Prop({ required: true })
  nome: string;

  @Prop({ required: true })
  descricao: string;

  @Prop({ type: Types.ObjectId, ref: 'Cliente', required: true })
  clienteId: Types.ObjectId;

  @Prop({ required: true })
  dataInicio: Date;

  @Prop({ required: true })
  dataFimPrevista: Date;

  @Prop()
  dataFimReal?: Date;

  @Prop({
    required: true,
    enum: StatusProjeto,
    default: StatusProjeto.PLANEJAMENTO,
  })
  status: StatusProjeto;

  @Prop({ type: [SubprojetoProjeto], default: [] })
  subprojetos: SubprojetoProjeto[];

  @Prop({ default: Date.now })
  dataCriacao: Date;
}

export const ProjetoSchema = SchemaFactory.createForClass(Projeto);
export const TarefaProjetoInfoSchema =
  SchemaFactory.createForClass(TarefaProjetoInfo);
export const SubprojetoProjetoSchema =
  SchemaFactory.createForClass(SubprojetoProjeto);
SchemaFactory.createForClass(TarefaProjetoInfo);

