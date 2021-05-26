import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Res } from '@nestjs/common';

import { Schema as MongooseSchema } from "mongoose";

import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { GetQueryDto } from 'src/dto/get-query.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ApiParam } from '@nestjs/swagger';

@Controller('clients')
export class ClientController {

    constructor(private service: ClientService) {}

    @Get()
    async getClients(@Query() getQueryDto: GetQueryDto, @Res() res: any) {
        const clients: any = await this.service.get(getQueryDto);
        return res.status(HttpStatus.OK).send(clients);
    }

    @Post()
    async createClient(@Body() createClientDto: CreateClientDto, @Res() res: any) {
        const created: any = await this.service.create(createClientDto);
        return res.status(HttpStatus.CREATED).send(created);
    }

    @Put(':id')
    async updateClient(@Param('id') id: MongooseSchema.Types.ObjectId, @Body() client: UpdateClientDto, @Res() res: any) {
        const updated: any = await this.service.update(id, client);
        return res.status(HttpStatus.CREATED).send(updated);
    }

    @Delete(':id')
    async deleteClient(@Param('id') id: MongooseSchema.Types.ObjectId, @Res() res: any) {
        await this.service.delete(id);
        return res.status(HttpStatus.OK).send();
    }
}
