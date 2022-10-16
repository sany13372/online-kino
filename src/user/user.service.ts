import { Injectable, NotFoundException } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { genSalt, hash } from 'bcryptjs';
import { Types } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';
import { UpdateUserDto } from './dto/updatedtouser';
import { UserModel } from './usermodule';

@Injectable()
export class UserService {
    constructor(@InjectModel(UserModel) private readonly UserModel:ModelType<UserModel>,){}
    async byId (_id:string) {
        const user = this.UserModel.findById({_id});
        if(!user) throw new NotFoundException('Такого пользователя нет')
        return user
    }

    async upDateProfile (_id:string,dto:UpdateUserDto) {
        const user = await this.byId(_id)

        const isUser = await this.UserModel.findOne({email:dto.email})

        if(isUser && String(_id) !== String(isUser._id)) throw new NotFoundException('Емэил занят')

        if(dto.password){
            const salt = await genSalt(10);
            user.password = await hash(dto.password,salt)
        }

        user.email = dto.email

        if (dto.isAdmin || dto.isAdmin === false) {
            user.isAdmin = dto.isAdmin
        }
        await user.save()
        return 
    }

    async getCount(){
        return this.UserModel.find().count().exec()
    }

    async getAll(searchTerm?:string){
        let opitons = {}

        if (searchTerm) {
            opitons = {
                $or:[
                    {
                        email: new RegExp(searchTerm,'i')
                    }
                ]
            }
        }

        return this.UserModel.find(opitons).sort({
            createdAt:'desc'
        }).exec()
    }

    async delete(id:string){
        return this.UserModel.findByIdAndDelete(id).exec()
    }

    async toggleFavorite(filmsId:Types.ObjectId,user:UserModel){
        const {_id,favorites} = user;

        await this.UserModel.findByIdAndUpdate(_id,{
            favorites:favorites.includes(filmsId) ? favorites.filter(id => String(id) !== String(filmsId)) : [...favorites,filmsId]
        })
    }

    async getFavorite(_id:Types.ObjectId) {
        return this.UserModel.findById(_id, 'favorites')
        .populate({
            path: 'favorites',
            populate: {
                path: 'genres',
            },
        })
        .exec()
        .then((data) => {
            return data.favorites
        })
    }
}
