import { Status } from '../schemas/tarefa.entity';

export class CreateTarefaDto {
  nome: string;
  descricao: string;
  status: Status;
}
