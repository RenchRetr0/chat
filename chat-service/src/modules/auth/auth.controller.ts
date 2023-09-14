import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { Tokens } from './types';
import { SignInDto } from './dto/Signin.dto';
import { JwtPayloadDto } from './dto/JwtPayload.dto';
import { RtGuard } from '@common/guards';
import { GetCurrentUser } from '@common/decorators';

@Controller('auth')
export class AuthController {
    constructor (private readonly authService: AuthService) {}

    @Post('signin')
    async signin(@Body() signinDto: SignInDto): Promise<Tokens>
    {
        return await this.authService.signin(signinDto);
    }

    @UseGuards(RtGuard)
    @Post('refresh')
    async refreshTokens(@GetCurrentUser() user: JwtPayloadDto)
    {
        return await this.authService.refreshTokens(user);
    }
}
