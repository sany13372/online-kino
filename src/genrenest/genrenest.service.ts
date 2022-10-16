import { Injectable, NotFoundException } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';
import { CreategenrenestDto } from './dto/creategenrenest.dto';
import { GenrenestModel } from './genrenest.model';

@Injectable()
export class GenrenestService {
    constructor(@InjectModel(GenrenestModel) private readonly GenrenestModel:ModelType<GenrenestModel>,){}
    
    getSlug(slug:string) {
        const acter = this.GenrenestModel.findOne({slug}).exec();
        if(!acter) throw new NotFoundException('Такого актера нет')
        return acter
    }

    async getAll(searchTerm?:string){
        let opitons = {}

        if (searchTerm) {
            opitons = {
                $or:[
                    {
                        name: new RegExp(searchTerm,'i')
                    },
                    {
                        slug: new RegExp(searchTerm,'i')
                    },
                    {
                        description: new RegExp(searchTerm,'i')
                    }
                ]
            }
        }

        return this.GenrenestModel.find(opitons).select('-password').sort({
            createdAt:'desc'
        }).exec()
    }

    async getCollection () {
        const genres = await this.getAll();

        const collections = []

        return collections
    }
//Admin
    async upDate(_id:string,dto:CreategenrenestDto) {
        return this.GenrenestModel.findByIdAndUpdate(_id,dto,{
            new:true
        }).exec()
    }

    async createSlug():Promise<Types.ObjectId>{
        const defaul:CreategenrenestDto ={
            description:'',
            name:'',
            icon:'',
            slug:'dw44',
        } 

        const genre = await this.GenrenestModel.create(defaul)

        return genre._id
    }



    async delete(id:string){
        return this.GenrenestModel.findByIdAndDelete(id).exec()
    }

    async byId (_id:string) {
        const genre = this.GenrenestModel.findById({_id});
        if(!genre) throw new NotFoundException('Такого жанра нет')
        return genre
    }
}
