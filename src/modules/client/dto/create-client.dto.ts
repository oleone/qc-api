import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateClientDto {
    
    @ApiProperty({
        type: String
    })
    name: string;

    @ApiProperty({
        type: String
    })
    cpf: string;

    @ApiProperty({
        type: String
    })
    email: string;

    @ApiPropertyOptional({
        type: String
    })
    phone: string;

    @ApiPropertyOptional({
        type: String
    })
    cep: string;

    @ApiPropertyOptional({
        type: Number
    })
    numero: number;
    
    @ApiPropertyOptional({
        type: String
    })
    logradouro: string;
    
    @ApiPropertyOptional({
        type: String
    })
    complemento: string;
    
    @ApiPropertyOptional({
        type: String
    })
    bairro: string;
    
    @ApiPropertyOptional({
        type: String
    })
    localidade: string;
    
    @ApiPropertyOptional({
        type: String
    })
    uf: string;
}
