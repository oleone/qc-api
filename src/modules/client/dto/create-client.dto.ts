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
}
