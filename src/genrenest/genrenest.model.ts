import { prop } from "@typegoose/typegoose"
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses"

export interface GenrenestModel extends Base{}

export class GenrenestModel extends TimeStamps {

    @prop()
    name:string

    @prop({unique:true})
    slug:string

    @prop()
    description:string

    @prop()
    icon:string
}