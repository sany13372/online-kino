import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';
import { GenrenestController } from './genrenest.controller';
import { GenrenestModel } from './genrenest.model';
import { GenrenestService } from './genrenest.service';

@Module({
  controllers: [GenrenestController],
  providers: [GenrenestService],
  imports:[
    TypegooseModule.forFeature([
      {
        typegooseClass:GenrenestModel,
        schemaOptions:{
          collection:'Genrenest'
        }
      }
    ]),
  ]
})
export class GenrenestModule {}
