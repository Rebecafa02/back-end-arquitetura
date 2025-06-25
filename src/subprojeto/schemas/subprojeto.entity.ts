import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SubprojetoDocument = Subprojeto & Document;

@Schema()
export class Subprojeto {
  @Prop({ required: true })
  nome: string;

  @Prop()
  descricao: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Tarefa' }], default: [] })
  tarefas: Types.ObjectId[];
}

export const SubprojetoSchema = SchemaFactory.createForClass(Subprojeto);
