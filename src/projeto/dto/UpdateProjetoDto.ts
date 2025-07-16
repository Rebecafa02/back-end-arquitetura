import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsOptional, IsDateString } from 'class-validator';
import { CreateProjetoDto } from './CreateProjetoDto';
import { StatusProjeto } from '../schemas/projeto.schema';

export class UpdateProjetoDto extends PartialType(CreateProjetoDto) {
  @IsEnum(StatusProjeto)
  @IsOptional()
  status?: StatusProjeto;

  @IsOptional()
  @IsDateString()
  dataFimReal?: string;
}