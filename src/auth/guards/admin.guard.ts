import { CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { UserModel } from "src/user/usermodule";


export class AdminGuard implements CanActivate{
    constructor(private reflector:Reflector){}

    canActivate(context: ExecutionContext): boolean  {
        const request = context.switchToHttp().getRequest<{user:UserModel}>();

        const user = request.user;

        if(!user.isAdmin) throw new ForbiddenException('У тебя нет прав')

        return user.isAdmin
    }
}