import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateReportDto {
    @IsNotEmpty()
    @IsString()
    latitude: string;
    
    @IsNotEmpty()
    @IsString()
    longitude: string;

    @IsNotEmpty()
    @IsString()
    plate_number: string;

    @IsOptional()
    @IsString()
    description: string;
}
