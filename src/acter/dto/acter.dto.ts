import { IsString } from "class-validator";

export class ActerDto{
    @IsString()
    name:string
    
    @IsString()
    slug:string

    @IsString()
    photo:string
}