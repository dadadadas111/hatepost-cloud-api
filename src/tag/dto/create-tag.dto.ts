import { IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTagDto {
    @IsString()
    @IsNotEmpty()
    label: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsMongoId()
    superTag: string;
}
