import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt }  from 'passport-jwt';
import appConfig from '@config/app.config';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh')
{
    constructor () 
    {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: appConfig().appSecret,
            passReqToCallback: true,
        })
    }

    validate(req: Request, payload: any) 
    {
        const refreshToken = req.get('authorization').replace('Bearer', '').trim();
        return {
            ...payload,
            refreshToken,
        };
    }
}