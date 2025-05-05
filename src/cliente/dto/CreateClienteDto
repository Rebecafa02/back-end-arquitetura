import { IsString, IsEmail, IsEnum, IsOptional } from 'class-validator';
import { ClienteTipo } from '../schemas/cliente.schema';


export class CreateClienteDto {
  @IsString()
  nome_completo: string;

  @IsEmail()
  email: string;

  @IsString()
  logradouro: string;

  @IsString()
  numero: string;

  @IsString()
  bairro: string;

  @IsOptional()
  @IsString()
  complemento?: string;

  @IsString()
  cidade: string;

  @IsString()
  uf: string;

  @IsString()
  cep: string;

  @IsEnum(ClienteTipo)
  tipo: ClienteTipo;
}
