import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserModel } from './usermodule';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports:[
    TypegooseModule.forFeature([
      {
        typegooseClass:UserModel,
        schemaOptions:{
          collection:'User'
        }
      }
    ]),
    ConfigModule,
  ]
})
export class UserModule {}
