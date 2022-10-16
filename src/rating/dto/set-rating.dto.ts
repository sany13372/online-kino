import { Types } from "mongoose";
import {IsObjectId} from 'class-validator-mongo-object-id'
import { IsNumber } from "class-validator";
export class RatingDto{
    @IsObjectId({message:'Не валидный айди фильма'})
    filmsId:Types.ObjectId

    @IsNumber()
    value:number
}