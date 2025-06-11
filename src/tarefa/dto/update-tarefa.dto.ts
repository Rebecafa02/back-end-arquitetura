import { PartialType } from '@nestjs/mapped-types';
import { CreateTarefaDto } from './create-tarefa.dto';
import { Status } from '../schemas/tarefa.entity';

export class UpdateTarefaDto extends PartialType(CreateTarefaDto) {
  status?: Status;
}
