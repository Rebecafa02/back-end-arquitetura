import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTarefaDto } from './dto/create-tarefa.dto';
import { UpdateTarefaDto } from './dto/update-tarefa.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Tarefa, TarefaDocument, Status } from './schemas/tarefa.entity';
import { Model } from 'mongoose';
import { normalizeText } from 'src/cliente/cliente.service';

@Injectable()
export class TarefaService {
  constructor(
    @InjectModel(Tarefa.name) private tarefaModel: Model<TarefaDocument>,
  ) {}

  async create(data: CreateTarefaDto): Promise<Tarefa> {
    const tarefa = new this.tarefaModel({ ...data, status: Status.ATIVO });
    return tarefa.save();
  }

  async findAll(): Promise<Tarefa[]> {
    return this.tarefaModel.find().exec();
  }

  async findOne(id: string): Promise<Tarefa> {
    const tarefa = await this.tarefaModel.findById(id).exec();
    if (!tarefa) {
      throw new NotFoundException(`Tarefa com ID ${id} não encontrada`);
    }
    return tarefa;
  }

  async update(id: string, updateTarefaDto: UpdateTarefaDto): Promise<Tarefa> {
    const updatedTarefa = await this.tarefaModel
      .findByIdAndUpdate(
        id,
        { ...updateTarefaDto, status: updateTarefaDto.status ?? Status.ATIVO },
        { new: true },
      )
      .exec();
    if (!updatedTarefa) {
      throw new NotFoundException(`Tarefa com ID ${id} não encontrada`);
    }
    return updatedTarefa;
  }

  async remove(id: string): Promise<void> {
    const result = await this.tarefaModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Tarefa com ID ${id} não encontrada`);
    }
  }

  async findByName(nome: string, limit = 20) {
    const normalized = nome.trim()
      ? {
          nome: {
            $regex: `.*${nome.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}.*`,
            $options: 'i',
          },
        }
      : {};

    const [tarefas, total] = await Promise.all([
      this.tarefaModel.find(normalized).limit(limit).exec(),
      this.tarefaModel.countDocuments(normalized).exec(),
    ]);

    return { tarefas, total };
  }
}
