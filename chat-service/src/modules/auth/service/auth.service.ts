import { Token, Tokens } from '@auth/types';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserService } from '@user/service/user.service';
import { SignInDto } from '@auth/dto/Signin.dto';
import { UsersUnauthorized } from '@user/errors/user-unauthorizad.error';
import { UsersNotFound } from '@user/errors/user-not-found.error';
import { JwtPayloadDto } from '@auth/dto/JwtPayload.dto';
import { EmailIsStatusService } from '@email-is-status/service/email-is-status.service';

@Injectable()
export class AuthService 
{
    constructor(
        private jwtService: JwtService,
        private userService: UserService,
        private emailIsStatusService: EmailIsStatusService
    ) {}

    async signin(signinDto: SignInDto): Promise<Tokens>
    {
        const user = await this.userService.findOne({login: signinDto.login}, {id: true, login: true, password: true});

        if (!user) throw new UsersNotFound();

        const isCorrectPassword = await this.validatePassword(signinDto.password, user.password);

        if (!isCorrectPassword) {
            throw new UsersUnauthorized();
        }

        return await this.generateToken(user.id, user.login);
    }

    // authorization by email confirmation
    async emailСonfirmation(strNumEmail: string): Promise<Tokens>
    {
        const email = await this.emailIsStatusService.decryptMail(strNumEmail);

        const user = await this.userService.findOne({email: email}, {id: true, login: true});

        if (!user) throw new UsersNotFound();

        await this.emailIsStatusService.emailConfirmed(user.id);

        return await this.generateToken(user.id, user.login);
    }

    async refreshTokens(jwtPayloadDto: JwtPayloadDto): Promise<Tokens>
    {
        const user = await this.userService.findOne({id: jwtPayloadDto.sub});

        if (!user) throw new UsersNotFound();

        return await this.generateToken(user.id, user.login);
    }

    async generateToken(userId: number, login: string): Promise<Tokens>
    {
        const accessToken = await this.jwtService.signAsync(
            {
                sub: userId,
                login: login
            },
            {
                expiresIn: 60 * 15,
            }
        );

        const refreshToken = await this.jwtService.signAsync(
            {
                sub: userId,
                login: login
            },
            {
                expiresIn: 60 * 60 * 24 * 7,
            }
        );

        return {
            access_token: accessToken,
            refresh_token: refreshToken
        };
    }

    async verifyJwt(jwt: string): Promise<Token> {
        return this.jwtService.verifyAsync(jwt);
    }

    private async validatePassword(password: string, storedPasswordHash: string): Promise<boolean>
    {
        return await compare( password, storedPasswordHash );
    }
}
