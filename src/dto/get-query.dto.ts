import { Schema as MongooseSchema } from "mongoose";

import { IsOptional } from "class-validator";

export class GetQueryDto {

    @IsOptional()
    id: MongooseSchema.Types.ObjectId;

    @IsOptional()
    from?: number;

    @IsOptional()
    limit?: number;
}