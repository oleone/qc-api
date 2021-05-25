import { Injectable } from '@nestjs/common';
import { GetQueryDto } from 'src/dto/get-query.dto';

import { ClientRepository } from 'src/repositories/client-repository';
import { CreateClientDto } from './dto/create-client.dto';

@Injectable()
export class ClientService {
    constructor(private readonly repository: ClientRepository) {}

    async get(getQueryDto: GetQueryDto) {
        return await this.repository.get(getQueryDto);
    }

    async create(client: CreateClientDto) {
        return await this.repository.create(client);
    }
}
