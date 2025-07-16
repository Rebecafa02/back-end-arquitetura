import {
  IsString,
  IsNotEmpty,
  IsMongoId,
  IsArray,
  ValidateNested,
  IsDateString,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { StatusTarefaProjeto } from '../schemas/projeto.schema';

export class CreateTarefaProjetoDto {
  @IsMongoId()
  tarefaId: string;

  @IsDateString()
  dataInicio: string;

  @IsDateString()
  dataFimPrevista: string;

  @IsOptional()
  @IsDateString()
  dataFimReal?: string;

  @IsEnum(StatusTarefaProjeto)
  @IsOptional()
  status?: StatusTarefaProjeto;

  @IsOptional()
  @IsString()
  observacoes?: string;
}

export class CreateSubprojetoProjetoDto {
  @IsMongoId()
  subprojetoId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTarefaProjetoDto)
  tarefas: CreateTarefaProjetoDto[];
}

export class CreateProjetoDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  descricao: string;

  @IsMongoId()
  clienteId: string;

  @IsDateString()
  dataInicio: string;

  @IsDateString()
  dataFimPrevista: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSubprojetoProjetoDto)
  subprojetos: CreateSubprojetoProjetoDto[];
}
