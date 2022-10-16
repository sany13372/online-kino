import { prop, Ref } from "@typegoose/typegoose"
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses"
import { FilmsModel } from "src/films/films.model"
import { UserModel } from "src/user/usermodule"


export interface RatingModel extends Base{}

export class RatingModel extends TimeStamps {
    @prop({ref: () => UserModel})
    userId?: Ref<UserModel>

    @prop({ref: () => FilmsModel})
    filmsId?: Ref<FilmsModel>

    @prop()
    value:number
}