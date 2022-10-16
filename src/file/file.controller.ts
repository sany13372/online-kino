import { Controller, HttpCode, Post, Query, UploadedFile, UseInterceptors,   } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { FileService } from './file.service';

@Controller('files')
export class FileController {
    constructor(private readonly fileServise:FileService){}


    @Post()
    @HttpCode(200)
    @Auth('admin')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile()file:any,@Query('folder') folder?:string){
        return this.fileServise.SaveFiles([file],folder)
    }
}
