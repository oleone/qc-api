import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Client {

    @Prop({ required: true, unique: false })
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: false, unique: true })
    phone: string;

    @Prop({ required: true, unique: true })
    cpf: string;

    @Prop({ auto: new Date() })
    createdAt: Date;

    @Prop({ auto: new Date() })
    updatedAt: Date;
}

export const ClientSchema = SchemaFactory.createForClass(Client);