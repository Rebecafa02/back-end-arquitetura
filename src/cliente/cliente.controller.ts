import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/CreateClienteDto';
import { UpdateClienteDto } from './dto/UpdateClienteDto';

@Controller('clientes')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post()
  create(@Body() createClienteDto: CreateClienteDto) {
    return this.clienteService.create(createClienteDto);
  }

  @Get()
  findAll(
    @Query('page') page?: number, // Página opcional
    @Query('limit') limit?: number, // Limite opcional
  ) {
    return this.clienteService.findAll(page, limit);
  }

  @Get('buscar')
  async buscarClientes(@Query('nome') nome: string){
    return this.clienteService.findByName(nome);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clienteService.findOne(id);
  }


  @Put(':id')
  update(@Param('id') id: string, @Body() updateClienteDto: UpdateClienteDto) {
    return this.clienteService.update(id, updateClienteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clienteService.remove(id);
  }

  
}
