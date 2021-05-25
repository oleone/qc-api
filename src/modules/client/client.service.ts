import { Injectable } from '@nestjs/common';
import { GetQueryDto } from 'src/dto/get-query.dto';

import { Schema as MongooseSchema } from "mongoose";

import { ClientRepository } from 'src/repositories/client-repository';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientService {
    constructor(private readonly repository: ClientRepository) {}

    async get(getQueryDto: GetQueryDto) {
        return await this.repository.get(getQueryDto);
    }

    async create(client: CreateClientDto) {
        return await this.repository.create(client);
    }

    async update(id: MongooseSchema.Types.ObjectId, client: UpdateClientDto) {
        return await this.repository.update(id, client);
    }

    async delete(id: MongooseSchema.Types.ObjectId) {
        return await this.repository.delete(id);
    }
}
