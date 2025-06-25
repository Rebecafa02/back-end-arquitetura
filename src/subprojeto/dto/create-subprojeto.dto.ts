import {
  IsString,
  IsNotEmpty,
  Length,
  IsArray,
  IsMongoId,
  ArrayNotEmpty,
  ArrayUnique,
  ValidateIf,
} from 'class-validator';

export class CreateSubprojetoDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  @Length(5, 500)
  descricao: string;

  @IsArray()
  @ArrayUnique()
  @ValidateIf((o) => o.tarefas && o.tarefas.length > 0)
  @IsMongoId({ each: true })
  tarefas: string[];
}
