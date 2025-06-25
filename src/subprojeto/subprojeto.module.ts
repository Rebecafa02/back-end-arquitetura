import { Module } from '@nestjs/common';
import { SubprojetoService } from './subprojeto.service';
import { SubprojetoController } from './subprojeto.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Subprojeto, SubprojetoSchema } from './schemas/subprojeto.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Subprojeto.name, schema: SubprojetoSchema }
    ]),
  ],
  controllers: [SubprojetoController],
  providers: [SubprojetoService],
})
export class SubprojetoModule {}
