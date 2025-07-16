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
import { ProjetoService } from './projeto.service';
import { CreateProjetoDto } from './dto/CreateProjetoDto';
import { UpdateProjetoDto } from './dto/UpdateProjetoDto';
import { StatusTarefaProjeto } from './schemas/projeto.schema';

@Controller('projetos')
export class ProjetoController {
  constructor(private readonly projetoService: ProjetoService) {}

  @Post()
  create(@Body() createProjetoDto: CreateProjetoDto) {
    return this.projetoService.create(createProjetoDto);
  }

  @Get()
  findAll() {
    return this.projetoService.findAll();
  }

  @Get('buscar')
  buscarProjetos(@Query('nome') nome: string) {
    return this.projetoService.findByName(nome);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projetoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjetoDto: UpdateProjetoDto) {
    return this.projetoService.update(id, updateProjetoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projetoService.remove(id);
  }

  @Patch(':projetoId/subprojetos/:subprojetoIndex/tarefas/:tarefaIndex/status')
  updateTarefaStatus(
    @Param('projetoId') projetoId: string,
    @Param('subprojetoIndex') subprojetoIndex: string,
    @Param('tarefaIndex') tarefaIndex: string,
    @Body()
    body: {
      status: StatusTarefaProjeto;
      dataFimReal?: string;
      observacoes?: string;
    },
  ) {
    const dataFimReal = body.dataFimReal
      ? new Date(body.dataFimReal)
      : undefined;
    return this.projetoService.updateTarefaStatus(
      projetoId,
      parseInt(subprojetoIndex),
      parseInt(tarefaIndex),
      body.status,
      dataFimReal,
      body.observacoes,
    );
  }
}
