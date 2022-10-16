import {ConfigService} from '@nestjs/config'
import { TypegooseModuleOptions } from 'nestjs-typegoose'

export const getMongoBdConfig =  async (ConfigService:ConfigService):Promise<TypegooseModuleOptions> => ({
    uri:ConfigService.get('MONGO_URI')
})