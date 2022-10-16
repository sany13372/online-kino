import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { UserModel } from 'src/user/usermodule';
import { AuthDto } from './dto/authdto';
import {hash, compare, genSalt} from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import { use } from 'passport';
import { RefreshTokendto } from './dto/refreshTokendto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(UserModel) private readonly UserModel:ModelType<UserModel>,
        private readonly jwtServise:JwtService
    ) {}
    async login ({email, password}:AuthDto) {
        const user = await this.validateUser(email, password)
        const tokens = await this.tokenpair(String(user._id))
        return {
            user:this.returnuserField(user),
            ...tokens
        }
    }
    async register({email, password}:AuthDto){

        const oldUser = await this.UserModel.findOne({email}).exec();
        if (oldUser) {
            throw new BadRequestException('Такой пользователь уже есть')
        }

        const salt = await genSalt(10);

        const newUser = new this.UserModel({
            email:email,
            password: await hash(password, salt)
        })
        const user = newUser.save()
        const tokens = await this.tokenpair(String(newUser._id))
        return {
            user:this.returnuserField(user),
            ...tokens
        }
    }

    async findByEmail(email: string) {
		return this.UserModel.findOne({ email }).exec()
	}

    async getNewTokens ({refreshToken}:RefreshTokendto) {
        if(!refreshToken) throw new UnauthorizedException('Пожалуйста войдите в систему')

        const result = await this.jwtServise.verifyAsync(refreshToken)

        if(!result) throw new UnauthorizedException('Не валидный токен')

        const user = await this.UserModel.findById(result._id);
        
        const tokens = await this.tokenpair(String(user._id))

        return {
            user:this.returnuserField(user),
            ...tokens
        }
    }

    async validateUser (email: string, password: string) {
        const user = await this.findByEmail(email);
        if(!user) throw new UnauthorizedException('Такого пользователя нету ');

        const isValidpassword = await compare(password,user.password)
        if(!isValidpassword) throw new UnauthorizedException('Неверный пароль');

        return user;
    }

    async tokenpair (userID:string){
        const data = {_id: userID}

        const refreshToken = await this.jwtServise.signAsync(data,{
            expiresIn:'15d'
        })

        const acessToken = await this.jwtServise.signAsync(data,{
            expiresIn:'1d'
        })

        return {refreshToken,acessToken}
    }

    returnuserField(user:any){
        return {
            email:user.email,
            isAdmin:user.isAdmin,
            _id:user._id
        }
    }
}
