import { Body, Controller, Delete, Get, HttpCode, Param, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { Types } from 'mongoose';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { IdValidationPipe } from 'src/pipes/id.validationpipe';
import { User } from './decorators/user.decorator';
import { UpdateUserDto } from './dto/updatedtouser';
import { UserService } from './user.service';
import { UserModel } from './usermodule';

@Controller('users')
export class UserController {
    constructor(private readonly userServis:UserService){}

    @Get('profile')
    @Auth()
    async getProfile(@User('_id') _id:string){
        return this.userServis.byId(_id)
    }

    @UsePipes(new ValidationPipe())
    @Put('profile')
    @HttpCode(200)
    @Auth()
    async updateProfile(@User('_id') _id:string,@Body() dto:UpdateUserDto){
        return this.userServis.upDateProfile(_id,dto)
    }

    @Get('profile/favorites')
    @Auth()
    async getFavorites(@User('_id') _id:Types.ObjectId){
        return this.userServis.getFavorite(_id)
    }

    @Put('profile/favorites')
    @HttpCode(200)
    @Auth('admin')
    async toggleFavorites(@Body('filmsId',IdValidationPipe) filmsId:Types.ObjectId,@User() user:UserModel){
        return this.userServis.toggleFavorite(filmsId,user)
    }

    @UsePipes(new ValidationPipe())
    @Put(':id')
    @HttpCode(200)
    @Auth('admin')
    async updateUser(@Param('id',IdValidationPipe) id:string,@Body() dto:UpdateUserDto){
        return this.userServis.upDateProfile(id,dto)
    }

    @Get('count')
    @Auth('admin')
    async getCounts(){
        return this.userServis.getCount()
    }

    @Get()
    @Auth('admin')
    async getUsers(@Query('searchTerm') searchTerm?:string){
        return this.userServis.getAll(searchTerm)
    }

    @Get(':id')
    @Auth('admin')
    async getUser(@Param('id',IdValidationPipe) id:string){
        return this.userServis.byId(id)
    }

    @Delete(':id')
    @HttpCode(200)
    @Auth('admin')
    async deletUser(@Param('id',IdValidationPipe) id:string){
        return this.userServis.delete(id)
    }
}
