import { Injectable, NotFoundException } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { ActerModel } from './acter.model';
import { ActerDto } from './dto/acter.dto';

@Injectable()
export class ActerService {
    constructor(@InjectModel(ActerModel) private readonly ActerModel:ModelType<ActerModel>){}

    getSlug(slug:string) {
        return this.ActerModel.findOne({slug}).exec()
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
                    }
                ]
            }
        }

        return this.ActerModel.aggregate().match(opitons).lookup({
            from:'Films',
            foreignField:'acters',
            localField:'_id',
            as:'films'
        }).addFields({
            countFilms:{
                $size:'$films'
            }
        })
        .project({
            __v:0,
            updateAt:0,
            films:0
        })
        .sort({
            createdAt:-1
        }).exec()
    }

//Admin
    async upDate(_id:string,dto:ActerDto) {
        return this.ActerModel.findByIdAndUpdate(_id,dto,{
            new:true
        }).exec()
    }

    async create(){
        const defaul:ActerDto ={
            name:'',
            photo:'',
            slug:'',
        } 

        const genre = await this.ActerModel.create(defaul)

        return genre._id
    }



    async delete(id:string){
        return this.ActerModel.findByIdAndDelete(id).exec()
    }

    async byId (_id:string) {
        const genre = this.ActerModel.findById({_id});
        if(!genre) throw new NotFoundException('Такого актера нет')
        return genre
    }
}
