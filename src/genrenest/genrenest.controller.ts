import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { IdValidationPipe } from 'src/pipes/id.validationpipe';
import { CreategenrenestDto } from './dto/creategenrenest.dto';
import { GenrenestService } from './genrenest.service';

@Controller('genres')
export class GenrenestController {
    constructor(private readonly GenrenestService:GenrenestService){}

    @Get('by-slug/:slug')
    async getSlug(@Param('slug') slug:string){
        const sluge = await this.GenrenestService.getSlug(slug);
        return sluge
    } 

    @Get('/collections')
    async getCollection(){
        return this.GenrenestService.getCollection()
    } 

    @Get()
    async getSlugs(@Query('searchTerm') searchTerm?:string){
        return this.GenrenestService.getAll(searchTerm)
    } 

    @Get(':id')
    @Auth('admin')
    async get(@Param('id', IdValidationPipe) id:string){
        return this.GenrenestService.byId(id)
    } 

    @UsePipes(new ValidationPipe())
    @Put(':id')
    @HttpCode(200)
    @Auth()
    async Update(@Param('id',IdValidationPipe) id:string, @Body() dto:CreategenrenestDto){
        const updateGenre = this.GenrenestService.upDate(id,dto);
        if (!updateGenre) throw new NotFoundException('Genre not found')
        return updateGenre 
    }

    @UsePipes(new ValidationPipe())
    @Post()
    @HttpCode(200)
    @Auth('admin')
    async create(){
        return this.GenrenestService.createSlug()
    }

    @Delete(':id')
    @HttpCode(200)
    @Auth('admin')
    async delete(@Param('id',IdValidationPipe)_id:string,){
        const delgener = this.GenrenestService.delete(_id)
        if (!delgener) throw new NotFoundException('Genre not found')
        return delgener 
    }


}
