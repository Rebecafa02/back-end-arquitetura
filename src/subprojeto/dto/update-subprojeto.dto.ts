import { PartialType } from '@nestjs/mapped-types';
import { CreateSubprojetoDto } from './create-subprojeto.dto';

export class UpdateSubprojetoDto extends PartialType(CreateSubprojetoDto) {}
