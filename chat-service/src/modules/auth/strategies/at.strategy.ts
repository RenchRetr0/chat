import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt }  from 'passport-jwt';
import appConfig from '@config/app.config';

type JwtPayload = {
    sub: number,
    login: string,
}

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt')
{
    constructor () 
    {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: appConfig().appSecret,
        })
    }

    validate(payload: JwtPayload) 
    {
        return payload;
    }
}