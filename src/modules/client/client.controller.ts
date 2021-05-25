import { Body, Controller, Get, HttpStatus, Post, Query, Res } from '@nestjs/common';

import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { GetQueryDto } from 'src/dto/get-query.dto';

@Controller('clients')
export class ClientController {

    constructor(private service: ClientService) {}

    @Get('')
    async getClients(@Query() getQueryDto: GetQueryDto, @Res() res: any) {
        const clients: any = await this.service.get(getQueryDto);
        return res.status(HttpStatus.OK).send(clients);
    }

    @Post()
    async createClient(@Body() createClientDto: CreateClientDto, @Res() res: any) {
        const created: any = await this.service.create(createClientDto);
        return res.status(HttpStatus.OK).send(created);
    }
}
