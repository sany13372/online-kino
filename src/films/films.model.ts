import { prop, Ref } from "@typegoose/typegoose"
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses"
import { ActerModel } from "src/acter/acter.model"
import { GenrenestModel } from "src/genrenest/genrenest.model"

export interface FilmsModel extends Base{}
export class Parametrs{
    @prop()
    year:number
    
    @prop()
    duration:number

    @prop()
    country:string

}
export class FilmsModel extends TimeStamps {
    parametrs?:Parametrs

    @prop()
    poster:string

    @prop()
    BigPoster:string

    @prop()
    title:string



    @prop({unique:true})
    slug:string

    @prop({default:4.0})
    rating?:number

    @prop({default:0})
    countOpen:number

    @prop()
    videoUrl:string

    @prop({default:false})
    isSendTelegramm?:boolean

    @prop({ref:() => ActerModel})
    acters:Ref<ActerModel>[]

    @prop({ref:() => GenrenestModel})
    genres:Ref<GenrenestModel>[]
}