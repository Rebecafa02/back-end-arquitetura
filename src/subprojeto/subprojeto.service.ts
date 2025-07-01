import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSubprojetoDto } from './dto/create-subprojeto.dto';
import { UpdateSubprojetoDto } from './dto/update-subprojeto.dto';
import { Subprojeto, SubprojetoDocument } from './schemas/subprojeto.entity';

@Injectable()
export class SubprojetoService {
  constructor(
    @InjectModel(Subprojeto.name)
    private subprojetoModel: Model<SubprojetoDocument>,
  ) {}

  async create(createSubprojetoDto: CreateSubprojetoDto): Promise<Subprojeto> {
    const created = new this.subprojetoModel(createSubprojetoDto);
    return created.save();
  }

  async findAll(): Promise<Subprojeto[]> {
    return this.subprojetoModel.find().populate('tarefas').exec();
  }

  async findOne(id: string): Promise<Subprojeto> {
    const subprojeto = await this.subprojetoModel.findById(id).exec();
    if (!subprojeto) {
      throw new NotFoundException(`Subprojeto com ID ${id} não encontrada`);
    }
    return subprojeto;
  }

  async update(
    id: string,
    updateSubprojetoDto: UpdateSubprojetoDto,
  ): Promise<Subprojeto> {
    const updatedSubprojeto = await this.subprojetoModel
      .findByIdAndUpdate(id, updateSubprojetoDto, { new: true })
      .exec();
    if (!updatedSubprojeto) {
      throw new NotFoundException(`Tarefa com ID ${id} não encontrada`);
    }
    return updatedSubprojeto;
  }

  async remove(id: string): Promise<any> {
    const deletedSubprojeto = this.subprojetoModel.findByIdAndDelete(id).exec();
    if (!deletedSubprojeto) {
      throw new NotFoundException(`Subprojeto com ID ${id} não encontrado`);
    } else {
      return { message: `Subprojeto com ID ${id} foi removido com sucesso` };
    }
  }

  async findByName(nome: string) {
    const normalized = nome.trim()
      ? {
          nome: {
            $regex: `.*${nome.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}.*`,
            $options: 'i',
          },
        }
      : {};

    const [subprojetos, total] = await Promise.all([
      this.subprojetoModel.find(normalized).exec(),
      this.subprojetoModel.countDocuments(normalized).exec(),
    ]);

    return { subprojetos, total };
  }
}
