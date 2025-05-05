import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { ClienteSchema } from './schemas/cliente.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Cliente', schema: ClienteSchema }]),
  ],
  controllers: [ClienteController],
  providers: [ClienteService],
})
export class ClienteModule {}
