import { PartialType } from '@nestjs/mapped-types';
import { CreateClienteDto } from './CreateClienteDto';

export class UpdateClienteDto extends PartialType(CreateClienteDto) {
  nome_completo?: string;
  email?: string;
  logradouro?: string;
  numero?: string;
  bairro?: string;
  cidade?: string;
  uf?: string;
  cep?: string;
  telefones?: string[];
  cpfOuCnpj?: string;
  nome_completo_normalizado?: string;
}
