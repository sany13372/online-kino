import { prop } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

export interface ActerModel extends Base{}

export class ActerModel extends TimeStamps {
    @prop()
    name:string
    
    @prop({unique:true})
    slug:string

    @prop()
    photo:string
}