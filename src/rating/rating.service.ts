import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';
import { FilmsService } from 'src/films/films.service';
import { RatingDto } from './dto/set-rating.dto';
import { RatingModel } from './rating.model';

@Injectable()
export class RatingService {
    constructor(@InjectModel(RatingModel) private readonly RatingModel:ModelType<RatingModel>,
    private readonly FilmsService:FilmsService
    ){}

    async getUserandFilmsRating(filmsId:Types.ObjectId,userId:Types.ObjectId){
        return this.RatingModel.findOne({filmsId,userId}).select('value').exec().then(data => data? data.value : 0)
    }

    async avarageRatingByMovie(filmsId:Types.ObjectId | string){
        const ratingfilms:RatingModel[] = await this.RatingModel.aggregate().match({
            filmsId: new Types.ObjectId(filmsId)
        }).exec()

        return ratingfilms.reduce((acc,item) => acc + item.value, 0) / ratingfilms.length
    }
    async setRating(userId:Types.ObjectId,dto:RatingDto){
        const {filmsId,value} = dto

        const newRatin = await this.RatingModel.findOneAndUpdate({filmsId,userId},{
            filmsId,userId,value
        },{
            new:true,
            upsert:true,
            setDefaultsOnInsert:true
        }).exec()

        const avaretRating = await this.avarageRatingByMovie(filmsId);

        await this.FilmsService.upDateRating(filmsId,avaretRating)
        
        return newRatin
    }
}
