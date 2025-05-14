import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cliente, ClienteDocument } from './schemas/cliente.schema'; 
import { CreateClienteDto } from './dto/CreateClienteDto';
import { UpdateClienteDto } from './dto/UpdateClienteDto'; 

@Injectable()
export class ClienteService {
  constructor(
    @InjectModel(Cliente.name) private clienteModel: Model<ClienteDocument>,
  ) {}

 
async create(createClienteDto: CreateClienteDto) {
  const cpfOuCnpj = createClienteDto.cpfOuCnpj.trim();

  const clienteExistente = await this.clienteModel.findOne({ cpfOuCnpj });

  if (clienteExistente) {
    throw new BadRequestException('CPF ou CNPJ já cadastrado.');
  }

  const nomeNormalizado = normalizeText(createClienteDto.nome_completo);

  const cliente = new this.clienteModel({
    ...createClienteDto,
    nome_completo_normalizado: nomeNormalizado,
  });

  return cliente.save();
}

  async findAll(page = 1, limit = 10): Promise<Cliente[]> {
    const skip = (page - 1) * limit;
    // .lean() retorna objetos simples, incluindo o _id
    const clientes = await this.clienteModel.find().skip(skip).limit(limit).lean().exec();
    // Mapeia para garantir que o id seja retornado como string
    return clientes;
  }

  async findOne(id: string): Promise<Cliente> {
    const cliente = await this.clienteModel.findById(id).exec();
    if (!cliente) {
      throw new NotFoundException(`Cliente com ID ${id} não encontrado`);
    }
    return cliente;
  }

  async update(id: string, updateClienteDto: UpdateClienteDto): Promise<Cliente> {
  // 1. Verifica se o cliente existe
  const clienteExistente = await this.clienteModel.findById(id);
  if (!clienteExistente) {
    throw new NotFoundException(`Cliente com ID ${id} não encontrado`);
  }

  // 2. Se CPF/CNPJ for alterado, verificar se já existe outro cliente com o mesmo
  if (updateClienteDto.cpfOuCnpj && updateClienteDto.cpfOuCnpj !== clienteExistente.cpfOuCnpj) {
    const cpfRepetido = await this.clienteModel.findOne({ cpfOuCnpj: updateClienteDto.cpfOuCnpj });
    if (cpfRepetido && String(cpfRepetido._id) !== id) {
      throw new BadRequestException('CPF ou CNPJ já está em uso por outro cliente.');
    }
  }

  // 3. Verifica se campos obrigatórios não estão sendo atualizados para vazio
  const camposObrigatorios: (keyof UpdateClienteDto)[] = [
    'nome_completo', 'email', 'logradouro', 'numero', 'bairro', 'cidade', 'uf', 'cep', 'tipo', 'telefones', 'cpfOuCnpj'
  ];

  for (const campo of camposObrigatorios) {
    if (campo in updateClienteDto) {
      const valor = updateClienteDto[campo];
      const ehInvalido = valor === null || valor === undefined || (typeof valor === 'string' && valor.trim() === '');

      if (ehInvalido) {
        throw new BadRequestException(`O campo "${campo}" não pode ser vazio.`);
      }
    }
  }

  // 4. Atualiza nome_completo_normalizado se nome foi alterado
  if (updateClienteDto.nome_completo) {
    updateClienteDto.nome_completo_normalizado = normalizeText(updateClienteDto.nome_completo);
  }

  // 5. Executa a atualização
  const updated = await this.clienteModel.findByIdAndUpdate(id, updateClienteDto, { new: true }).exec();

  if (!updated) {
      throw new NotFoundException(`Cliente com ID ${id} não encontrado após a atualização.`);
  }
  return updated;
}

  async remove(id: string): Promise<void> {
    const result = await this.clienteModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Cliente com ID ${id} não encontrado`);
    }
  }

 async findByName(nome: string, limit = 20) {
  const normalized = nome.trim()
    ? {
        nome_completo_normalizado: {
          $regex: `.*${normalizeText(nome).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}.*`,
          $options: 'i',
        },
      }
    : {};

  const [clientes, total] = await Promise.all([
    this.clienteModel.find(normalized).limit(limit).exec(),
    this.clienteModel.countDocuments(normalized).exec(),
  ]);

  return {
    clientes,
    total,
  };
}

}

export function normalizeText(text: string): string {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}