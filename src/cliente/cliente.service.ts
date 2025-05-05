import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cliente, ClienteDocument } from './schemas/cliente.schema';
import { CreateClienteDto } from '.dto/CreateClienteDto'; 
import { UpdateCliente}

@Injectable()
export class ClienteService {
  constructor(
    @InjectModel(Cliente.name) private clienteModel: Model<ClienteDocument>,
  ) {}

  async create(createClienteDto: CreateClienteDto): Promise<Cliente> {
    const cliente = new this.clienteModel(createClienteDto);
    return cliente.save();
  }

  async findAll(): Promise<Cliente[]> {
    return this.clienteModel.find().exec();
  }

  async findOne(id: string): Promise<Cliente> {
    const cliente = await this.clienteModel.findById(id).exec();
    if (!cliente) {
      throw new NotFoundException(`Cliente com ID ${id} não encontrado`);
    }
    return cliente;
  }

  async update(id: string, updateClienteDto: UpdateClienteDto): Promise<Cliente> {
    const updated = await this.clienteModel.findByIdAndUpdate(id, updateClienteDto, { new: true }).exec();
    if (!updated) {
      throw new NotFoundException(`Cliente com ID ${id} não encontrado`);
    }
    return updated;
  }

  async remove(id: string): Promise<void> {
    const result = await this.clienteModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Cliente com ID ${id} não encontrado`);
    }
  }
}
