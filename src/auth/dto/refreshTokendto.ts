import { IsString } from "class-validator";

export class  RefreshTokendto {
    @IsString()
    refreshToken:string
}