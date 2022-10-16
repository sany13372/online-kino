import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ModelType } from "@typegoose/typegoose/lib/types";
import { InjectModel } from "nestjs-typegoose";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserModel } from "src/user/usermodule";
@Injectable()
export class JwtStragety extends PassportStrategy(Strategy){
	constructor(
		private readonly configService: ConfigService,
		@InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: true,
			secretOrKey: configService.get('JWT_SECRET'),
		})
	}

	async validate({ _id }: any) {
		const user = await this.UserModel.findById(_id)
		return user
	}

}