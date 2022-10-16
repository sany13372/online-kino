import { Body, Controller, Get, HttpCode, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Types } from 'mongoose';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { IdValidationPipe } from 'src/pipes/id.validationpipe';
import { User } from 'src/user/decorators/user.decorator';
import { RatingDto } from './dto/set-rating.dto';
import { RatingService } from './rating.service';

@Controller('ratings')
export class RatingController {
    constructor( private readonly RatingService:RatingService){}

    @Get(':filmsId')
    @Auth()
    async getRating(@Param('filmsId',IdValidationPipe) filmsId:Types.ObjectId, @User('_id') _id:Types.ObjectId){
        return this.RatingService.getUserandFilmsRating(filmsId,_id)
    }

    @UsePipes(new ValidationPipe())
    @Post('set-rating')
    @HttpCode(200)
    @Auth()
    async setRating(@User('_id') _id:Types.ObjectId, @Body() dto:RatingDto){
        return this.RatingService.setRating(_id,dto)
    }
}
