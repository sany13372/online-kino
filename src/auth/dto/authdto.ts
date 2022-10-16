import { IsEmail, IsString, MinLength } from "class-validator"

export class AuthDto {
    @IsEmail()
    email:string
    
    @MinLength(6,{
        message:'Пароль меньше 6 симолов '
    })
    @IsString()
    password:string
}