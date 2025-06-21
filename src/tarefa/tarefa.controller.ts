import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TarefaService } from './tarefa.service';
import { CreateTarefaDto } from './dto/create-tarefa.dto';
import { UpdateTarefaDto } from './dto/update-tarefa.dto';

@Controller('tarefas')
export class TarefaController {
  constructor(private readonly tarefaService: TarefaService) {}

  @Post()
  create(@Body() createTarefaDto: CreateTarefaDto) {
    return this.tarefaService.create(createTarefaDto);
  }

  @Get()
  findAll() {
    return this.tarefaService.findAll();
  }

  @Get('buscar')
  buscarTarefas(@Query('nome') nome: string) {
    return this.tarefaService.findByName(nome);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tarefaService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTarefaDto: UpdateTarefaDto) {
    return this.tarefaService.update(id, updateTarefaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tarefaService.remove(id);
  }
}
