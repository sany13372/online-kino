import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { ActerController } from './acter.controller';
import { ActerModel } from './acter.model';
import { ActerService } from './acter.service';

@Module({
  controllers: [ActerController],
  providers: [ActerService],
  imports:[
    TypegooseModule.forFeature([
      {
        typegooseClass:ActerModel,
        schemaOptions:{
          collection:'Acter'
        }
      }
    ]),
  ]
})
export class ActerModule {}
