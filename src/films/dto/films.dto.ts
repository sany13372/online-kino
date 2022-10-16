import { IsArray, IsBoolean, IsNumber, IsObject, IsString } from "class-validator"

export class Parametrs{
    @IsNumber()
    year:number
    
    @IsNumber()
    duration:number

    @IsString()
    country:string

}
export class FilmsDto {
    @IsObject()
    parametrs?:Parametrs

    @IsString()
    poster:string

    @IsString()
    BigPoster:string

    @IsString()
    title:string



    @IsString()
    slug:string

    @IsString()
    videoUrl:string

    @IsArray()
    @IsString({each:true})
    genres:string[]

    isSendTelegramm?:boolean

    @IsArray()
    @IsString({each:true})
    acters:string[]

}