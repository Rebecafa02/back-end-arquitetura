import { IsString, IsEmail, IsEnum, IsOptional, IsArray, ArrayMinSize } from 'class-validator';
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

  @IsArray()
  @ArrayMinSize(1) // Garante que pelo menos um telefone seja fornecido
  @IsString({ each: true }) // Valida que cada item no array seja uma string
  telefones: string[];

  @IsString()
  cpfOuCnpj: string;

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
