import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { FilmsModel } from 'src/films/films.model';
import { FilmsModule } from 'src/films/films.module';
import { FilmsService } from 'src/films/films.service';
import { RatingController } from './rating.controller';
import { RatingModel } from './rating.model';
import { RatingService } from './rating.service';

@Module({
  controllers: [RatingController],
  providers: [RatingService],
  imports:[
    TypegooseModule.forFeature([
      {
        typegooseClass:RatingModel,
        schemaOptions:{
          collection:'Rating'
        }
      },
    ]),
    FilmsModule,
  ],
  exports:[RatingService],
})
export class RatingModule {}
