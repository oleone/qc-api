import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { Model, Schema as MongooseSchema } from "mongoose";
import { GetQueryDto } from "src/dto/get-query.dto";
import { ResponseDto } from "src/dto/response.dto";

import { Client } from "src/entities/client";
import { CreateClientDto } from "src/modules/client/dto/create-client.dto";
import { UpdateClientDto } from "src/modules/client/dto/update-client.dto";

export class ClientRepository {
    constructor(
        @InjectModel(Client.name)
        private readonly model: Model<Client>,
    ) { }

    async create(createClientDto: CreateClientDto) {
        const clientExists: any = await this.getByEmail(createClientDto.email);

        if (!clientExists) {
            const newClient = new this.model({
                name: createClientDto.name,
                email: createClientDto.email,
                phone: createClientDto.phone,
                cpf: createClientDto.cpf,
                createdAt: new Date()
            });

            try {
                const createdClient = await newClient.save();
                return createdClient;
            } catch (error) {
                throw new InternalServerErrorException('Erro ao cadastrar registro no banco', error);
            }
        } else {
            if (clientExists.email === createClientDto.email) {
                throw new ConflictException('O e-mail já foi cadastrado no banco.');
            }
            if (clientExists.cpf === createClientDto.cpf) {
                throw new ConflictException('Já existe um cliente com esse mesmo CPF cadastrado.');
            }
        }
    }

    async get(query: GetQueryDto) {
        /* Paginator */
        let from = query.from || 0;
        from = Number(from);

        let limit = query.limit || 20;
        limit = Number(limit);

        let clients: Client[];

        try {
            if (limit === 0) {
                clients = await this.model
                    .find()
                    .populate('client')
                    .skip(from)
                    .sort({ createdAt: -1 })
                    .exec();
            } else {
                clients = await this.model
                    .find()
                    .populate('client')
                    .skip(from)
                    .limit(limit)
                    .sort({ createdAt: -1 })
                    .exec();
            }

            let response: ResponseDto;

            if (clients.length > 0) {
                response = {
                    ok: true,
                    data: clients,
                    message: 'Busca de clientes OK!'
                };
            } else {
                response = {
                    ok: true,
                    data: [],
                    message: 'Não existem clientes cadastrados'
                };
            }
            return response;

        } catch (error) {
            throw new InternalServerErrorException('Erro ao tentar buscar clientes ', error);
        }
    }

    async getByEmail(email: string) {
        try {
            const client = await this.model.findOne({ email });
            return client;
        } catch (error) {
            throw new InternalServerErrorException('Erro ao consultar banco ', error);
        }
    }

    async getById(id: MongooseSchema.Types.ObjectId) {
        try {
            const client = await this.model.findById(id);
            return client;
        } catch (error) {
            throw new InternalServerErrorException('Erro ao buscar cliente ', error);
        }
    }

    async update(id: MongooseSchema.Types.ObjectId, client: UpdateClientDto) {
        const exists = await this.getById(id);

        if (exists) {
            const updated = await this.model.findOneAndUpdate({ _id: id }, client, { upsert: true });
            return updated;
        } else {
            throw new ConflictException('Id não localizado.');            
        }
    }

    async delete(id: MongooseSchema.Types.ObjectId) {
        try {
            const deleted = await this.model.deleteOne({ _id: id });
            console.log(deleted);
            return true;
        } catch (error) {
            throw new InternalServerErrorException('Erro ao deletar cliente.');
        }
    }
}
