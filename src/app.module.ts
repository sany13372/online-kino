import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getMongoBdConfig } from 'config/mongoconfig';
import { TypegooseModule } from 'nestjs-typegoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { GenrenestModule } from './genrenest/genrenest.module';
import { FileModule } from './file/file.module';
import { ActerModule } from './acter/acter.module';
import { FilmsModule } from './films/films.module';
import { RatingModule } from './rating/rating.module';
import { TelegramModule } from './telegram/telegram.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypegooseModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:getMongoBdConfig,
    }),
    AuthModule,
    UserModule,
    GenrenestModule,
    FileModule,
    ActerModule,
    FilmsModule,
    RatingModule,
    TelegramModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
