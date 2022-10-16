import { Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/authdto';
import { RefreshTokendto } from './dto/refreshTokendto';

@Controller('auth')
export class AuthController {
    constructor (private readonly authServise:AuthService) {}
    @UsePipes(new ValidationPipe)
    @HttpCode(200)
    @Post('register') 
    async register (@Body() dto:AuthDto) { 
        return this.authServise.register(dto)
    }

    @UsePipes(new ValidationPipe)
    @HttpCode(200)
    @Post('login/access-token') 
    async getNewTokens (@Body() dto:RefreshTokendto) { 
        return this.authServise.getNewTokens(dto)
    }

    @UsePipes(new ValidationPipe)
    @HttpCode(200)
    @Post('login') 
    async login (@Body() dto:AuthDto) { 
        return this.authServise.login(dto)
    }
}
