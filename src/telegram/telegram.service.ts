import { Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { Telegram } from './telegram.interface';

@Injectable()
export class TelegramService {
    bot:Telegraf
    options:Telegram

    constructor(){
    }
}
