import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { IdValidationPipe } from 'src/pipes/id.validationpipe';
import { ActerService } from './acter.service';
import { ActerDto } from './dto/acter.dto';

@Controller('acter')
export class ActerController {
    constructor(private readonly ActerService:ActerService){}
    @Get('by-slug/:slug')
    async getSlug(@Param('slug') slug:string){
        const sluge = await this.ActerService.getSlug(slug);
        return sluge
    } 



    @Get()
    async getActer(@Query('searchTerm') searchTerm?:string){
        return this.ActerService.getAll(searchTerm)
    } 

    @Get(':id')
    @Auth('admin')
    async get(@Param('id', IdValidationPipe) id:string){
        return this.ActerService.byId(id)
    } 

    @UsePipes(new ValidationPipe())
    @Put(':id')
    @HttpCode(200)
    @Auth()
    async Update(@Param('id',IdValidationPipe) id:string, @Body() dto:ActerDto){
        const updateGenre = this.ActerService.upDate(id,dto);
        if (!updateGenre) throw new NotFoundException('Актер не найден')
        return updateGenre 
    }

    @UsePipes(new ValidationPipe())
    @Post()
    @HttpCode(200)
    @Auth('admin')
    async create(){
        return this.ActerService.create()
    }

    @Delete(':id')
    @HttpCode(200)
    @Auth('admin')
    async delete(@Param('id',IdValidationPipe)_id:string,){
        const delgener = this.ActerService.delete(_id)
        if (!delgener) throw new NotFoundException('Актер не найден')
        return delgener 
    }
}
