import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { UserModel } from 'src/user/usermodule';
import { FilmsController } from './films.controller';
import { FilmsModel } from './films.model';
import { FilmsService } from './films.service';

@Module({
  controllers: [FilmsController],
  providers: [FilmsService],
  exports:[FilmsService],
  imports:[
    TypegooseModule.forFeature([
      {
        typegooseClass:FilmsModel,
        schemaOptions:{
          collection:'Films'
        }
      }
    ]),
    UserModel,
  ],
})
export class FilmsModule {}
