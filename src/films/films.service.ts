import { Injectable, NotFoundException } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';
import { FilmsDto } from './dto/films.dto';
import { FilmsModel } from './films.model';

@Injectable()
export class FilmsService {
    constructor(@InjectModel(FilmsModel) private readonly FilmsModel:ModelType<FilmsModel>){}

    getSlug(slug:string) {
        const doc = this.FilmsModel.findOne({slug}).populate('acters genres').exec()
        if(!doc) throw new NotFoundException('Фильм  не найден')
        return doc
    }
    getActer(acterId:Types.ObjectId) {
        const doc = this.FilmsModel.find({acters: acterId}).exec()
        if(!doc) throw new NotFoundException('Фильм  не найден')
        return doc
    }
    getGeners(generesId:Types.ObjectId[]) {
        const docs = this.FilmsModel.find({genres:{$in:generesId}}).exec()
        if(!docs) throw new NotFoundException('Фильм  не найден')
        return docs
    }

    async upDateCountOpened(slug:string) {
        const films = this.FilmsModel.findOneAndUpdate({slug},{
            $inc:{countOpen:1},
            new:true
        }).exec()
        if(!films) throw new NotFoundException('Фильм  не найден')
        return films
    }

    async getAll(searchTerm?:string){
        let opitons = {}

        if (searchTerm) {
            opitons = {
                $or:[
                    {
                        title: new RegExp(searchTerm,'i')
                    },
                ]
            }
        }

        return this.FilmsModel.find(opitons).sort({
            createdAt:'desc'
        }).populate('acters genres').exec()
    }

    getMostPopular() {
        return this.FilmsModel.find({countOpen:{$gt: 0 }}).sort({countOpen:-1}).populate('genres').exec()
    }

    upDateRating(id:Types.ObjectId,newRating:number){
        return this.FilmsModel.findByIdAndUpdate(id,{
            rating:newRating
        },{
            new:true
        }).exec()
    }

//Admin
    async upDate(_id:string,dto:FilmsDto) {
        const film = await this.FilmsModel.findByIdAndUpdate(_id,dto,{
            new:true
        }).exec();
        console.log(film);
        return film
    }

    async create(){
        const defaul:FilmsDto ={
            BigPoster:'',
            acters:[],
            genres:[],
            poster:'',
            title:'',
            videoUrl:'',
            slug:''
        } 

        const film = await this.FilmsModel.create(defaul)

        return film._id
    }



    async delete(id:string){
        return this.FilmsModel.findByIdAndDelete(id).exec()
    }

    async byId (_id:string) {
        const film = this.FilmsModel.findById({_id});
        if(!film) throw new NotFoundException('Такого фильма нет')
        return film
    }

}
