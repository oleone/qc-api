import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { User, UserSchema } from 'src/entities/user';
import { Client, ClientSchema } from 'src/entities/client';
import { ClientRepository } from 'src/repositories/client-repository';

@Module({
  imports: [
    ClientModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }]),
  ],
  controllers: [ClientController],
  providers: [ClientService, ClientRepository],
  exports: [ClientService, ClientRepository]
})
export class ClientModule {}
