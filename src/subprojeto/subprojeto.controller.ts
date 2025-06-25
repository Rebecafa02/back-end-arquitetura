import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubprojetoService } from './subprojeto.service';
import { CreateSubprojetoDto } from './dto/create-subprojeto.dto';
import { UpdateSubprojetoDto } from './dto/update-subprojeto.dto';

@Controller('subprojetos')
export class SubprojetoController {
  constructor(private readonly subprojetoService: SubprojetoService) {}

  @Post()
  create(@Body() createSubprojetoDto: CreateSubprojetoDto) {
    return this.subprojetoService.create(createSubprojetoDto);
  }

  @Get()
  findAll() {
    return this.subprojetoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subprojetoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubprojetoDto: UpdateSubprojetoDto) {
    return this.subprojetoService.update(id, updateSubprojetoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subprojetoService.remove(id);
  }
}
