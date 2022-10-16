import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { Types } from 'mongoose';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { IdValidationPipe } from 'src/pipes/id.validationpipe';
import { FilmsDto } from './dto/films.dto';
import { FilmsService } from './films.service';

@Controller('films')
export class FilmsController {
    constructor(private readonly FilmsService:FilmsService){}

    @Get('by-slug/:slug')
    async getSlug(@Param('slug') slug:string){
        const sluge = await this.FilmsService.getSlug(slug);
        return sluge
    } 

    @Get('by-actor/:actorId')
    async getActers(@Param('actorId',IdValidationPipe) actorId:Types.ObjectId){
        return this.FilmsService.getActer(actorId)
    } 

    @Post('by-geners')
    @HttpCode(200)
    async getGeners(@Body('generesId') generesId:Types.ObjectId[]){
        return this.FilmsService.getGeners(generesId)
    } 

    @Get()
    async getAll(@Query('searchTerm') searchTerm?:string){
        return this.FilmsService.getAll(searchTerm)
    }

    @Get('most-popular')
    async getMostPopular(){
        return this.FilmsService.getMostPopular()
    }

    @Put('update-count-open')
    @HttpCode(200)
    async upDateCountOpen(@Body('slug') slug:string){
        return this.FilmsService.upDateCountOpened(slug)
    } 

    @Get(':id')
    @Auth('admin')
    async get(@Param('id', IdValidationPipe) id:string){
        return this.FilmsService.byId(id)
    } 

    @UsePipes(new ValidationPipe())
    @Put(':id')
    @HttpCode(200)
    @Auth()
    async Update(@Param('id',IdValidationPipe) id:string, @Body() dto:FilmsDto){
        const updateGenre = this.FilmsService.upDate(id,dto);
        console.log(updateGenre);
        if (!updateGenre) throw new NotFoundException('Фильм не найден')
        return updateGenre 
    }

    @UsePipes(new ValidationPipe())
    @Post()
    @HttpCode(200)
    @Auth('admin')
    async create(){
        return this.FilmsService.create()
    }

    @Delete(':id')
    @HttpCode(200)
    @Auth('admin')
    async delete(@Param('id',IdValidationPipe)_id:string,){
        const delgener = this.FilmsService.delete(_id )
        if (!delgener) throw new NotFoundException('Фильм не найден')
        return delgener 
    }
}
