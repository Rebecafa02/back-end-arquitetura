import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProjetoDto } from './dto/CreateProjetoDto';
import {
  Projeto,
  ProjetoDocument,
  StatusTarefaProjeto,
} from './schemas/projeto.schema';
import { UpdateProjetoDto } from './dto/UpdateProjetoDto';

@Injectable()
export class ProjetoService {
  constructor(
    @InjectModel(Projeto.name) private projetoModel: Model<ProjetoDocument>,
  ) {}

  async create(createProjetoDto: CreateProjetoDto): Promise<Projeto> {
    // Validar se as datas fazem sentido
    const dataInicio = new Date(createProjetoDto.dataInicio);
    const dataFimPrevista = new Date(createProjetoDto.dataFimPrevista);

    if (dataFimPrevista <= dataInicio) {
      throw new BadRequestException(
        'A data fim prevista deve ser posterior à data de início',
      );
    }

    // Converter as datas dos DTOs para o formato do modelo
    const projetoData = {
      ...createProjetoDto,
      dataInicio,
      dataFimPrevista,
      subprojetos: createProjetoDto.subprojetos.map((subprojeto) => ({
        subprojetoId: subprojeto.subprojetoId,
        tarefas: subprojeto.tarefas.map((tarefa) => ({
          tarefaId: tarefa.tarefaId,
          dataInicio: new Date(tarefa.dataInicio),
          dataFimPrevista: new Date(tarefa.dataFimPrevista),
          dataFimReal: tarefa.dataFimReal
            ? new Date(tarefa.dataFimReal)
            : undefined,
          status: tarefa.status || StatusTarefaProjeto.NAO_INICIADA,
          observacoes: tarefa.observacoes || '',
        })),
      })),
    };

    const projeto = new this.projetoModel(projetoData);
    return projeto.save();
  }

  async findAll(): Promise<Projeto[]> {
    return this.projetoModel
      .find()
      .populate('clienteId', 'nome_completo email')
      .populate('subprojetos.subprojetoId', 'nome descricao')
      .populate('subprojetos.tarefas.tarefaId', 'nome descricao status')
      .exec();
  }

  async findOne(id: string): Promise<Projeto> {
    const projeto = await this.projetoModel
      .findById(id)
      .populate('clienteId', 'nome_completo email')
      .populate('subprojetos.subprojetoId', 'nome descricao')
      .populate('subprojetos.tarefas.tarefaId', 'nome descricao status')
      .exec();

    if (!projeto) {
      throw new NotFoundException(`Projeto com ID ${id} não encontrado`);
    }
    return projeto;
  }

  async update(
    id: string,
    updateProjetoDto: UpdateProjetoDto,
  ): Promise<Projeto> {
    const projeto = await this.projetoModel.findById(id);
    if (!projeto) {
      throw new NotFoundException(`Projeto com ID ${id} não encontrado`);
    }

    // Validar datas se foram fornecidas
    if (updateProjetoDto.dataInicio && updateProjetoDto.dataFimPrevista) {
      const dataInicio = new Date(updateProjetoDto.dataInicio);
      const dataFimPrevista = new Date(updateProjetoDto.dataFimPrevista);

      if (dataFimPrevista <= dataInicio) {
        throw new BadRequestException(
          'A data fim prevista deve ser posterior à data de início',
        );
      }
    }

    const updateData = {
      ...updateProjetoDto,
      ...(updateProjetoDto.dataInicio && {
        dataInicio: new Date(updateProjetoDto.dataInicio),
      }),
      ...(updateProjetoDto.dataFimPrevista && {
        dataFimPrevista: new Date(updateProjetoDto.dataFimPrevista),
      }),
      ...(updateProjetoDto.dataFimReal && {
        dataFimReal: new Date(updateProjetoDto.dataFimReal),
      }),
    };

    const updatedProjeto = await this.projetoModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .populate('clienteId', 'nome_completo email')
      .populate('subprojetos.subprojetoId', 'nome descricao')
      .populate('subprojetos.tarefas.tarefaId', 'nome descricao status')
      .exec();

    if (!updatedProjeto) {
      throw new NotFoundException(`Projeto com ID ${id} não encontrado`);
    }

    return updatedProjeto;
  }

  async remove(id: string): Promise<void> {
    const result = await this.projetoModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Projeto com ID ${id} não encontrado`);
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

    const [projetos, total] = await Promise.all([
      this.projetoModel
        .find(normalized)
        .populate('clienteId', 'nome_completo email')
        .populate('subprojetos.subprojetoId', 'nome descricao')
        .populate('subprojetos.tarefas.tarefaId', 'nome descricao status')
        .exec(),
      this.projetoModel.countDocuments(normalized).exec(),
    ]);

    return { projetos, total };
  }

  async updateTarefaStatus(
    projetoId: string,
    subprojetoIndex: number,
    tarefaIndex: number,
    status: StatusTarefaProjeto,
    dataFimReal?: Date,
    observacoes?: string,
  ): Promise<Projeto> {
    const projeto = await this.projetoModel.findById(projetoId);
    if (!projeto) {
      throw new NotFoundException(`Projeto com ID ${projetoId} não encontrado`);
    }

    if (!projeto.subprojetos[subprojetoIndex]) {
      throw new NotFoundException(`Subprojeto não encontrado no projeto`);
    }

    if (!projeto.subprojetos[subprojetoIndex].tarefas[tarefaIndex]) {
      throw new NotFoundException(`Tarefa não encontrada no subprojeto`);
    }

    projeto.subprojetos[subprojetoIndex].tarefas[tarefaIndex].status = status;
    if (dataFimReal) {
      projeto.subprojetos[subprojetoIndex].tarefas[tarefaIndex].dataFimReal =
        dataFimReal;
    }
    if (observacoes !== undefined) {
      projeto.subprojetos[subprojetoIndex].tarefas[tarefaIndex].observacoes =
        observacoes;
    }

    return projeto.save();
  }
}
