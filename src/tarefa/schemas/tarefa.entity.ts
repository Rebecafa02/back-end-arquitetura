import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TarefaDocument = Tarefa & Document;

export enum Status {
  ATIVO = 'ATIVO',
  INATIVO = 'INATIVO',
}

@Schema()
export class Tarefa {
  @Prop({ required: true })
  nome: string;

  @Prop({ required: true })
  descricao: string;

  @Prop({ required: true, enum: Status })
  status: Status;
}

export const TarefaSchema = SchemaFactory.createForClass(Tarefa);
