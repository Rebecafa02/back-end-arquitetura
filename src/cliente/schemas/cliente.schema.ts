import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ClienteDocument = Cliente & Document;

export enum ClienteTipo {
    PESSOA_FISICA = 'PESSOA_FISICA',
    PESSOA_JURIDICA = 'PESSOA_JURIDICA',
}

@Schema()
export class Cliente{
    @Prop({required: true})
    nome_completo: string;

    @Prop({required: true})
    email: string;

    @Prop({required: true})
    logradouro: string;
    
    @Prop({required: true})
    numero: string;

    @Prop({required: true})
    bairro: string;

    @Prop()
    complemento: string;

    @Prop({required: true})
    cidade: string;

    @Prop({required: true})
    uf: string;

    @Prop({required: true})
    cep: string;

    @Prop({required: true, enum: ClienteTipo})
    tipo: ClienteTipo
    
}

export const ClienteSchema = SchemaFactory.createForClass(Cliente);




  