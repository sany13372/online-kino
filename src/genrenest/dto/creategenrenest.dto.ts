import { IsString } from "class-validator"

export class CreategenrenestDto{
    @IsString()
    name:string

    @IsString()
    slug:string

    @IsString()
    description:string

    @IsString()
    icon:string
}