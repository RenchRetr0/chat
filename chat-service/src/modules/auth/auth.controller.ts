import { Body, Controller, Post, UseGuards, HttpCode } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { Tokens } from './types';
import { SignInDto } from './dto/Signin.dto';
import { JwtPayloadDto } from './dto/JwtPayload.dto';
import { RtGuard } from '@common/guards';
import { GetCurrentUser } from '@common/decorators';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags("Auth")
@Controller('auth')
export class AuthController {
    constructor (private readonly authService: AuthService) {}

    @Post('signin')
    @HttpCode(200)
    async signin(@Body() signinDto: SignInDto): Promise<Tokens>
    {
        return await this.authService.signin(signinDto);
    }

    @UseGuards(RtGuard)
    @Post('refresh')
    @ApiBearerAuth()
    @HttpCode(200)
    async refreshTokens(@GetCurrentUser() user: JwtPayloadDto): Promise<Tokens>
    {
        return await this.authService.refreshTokens(user);
    }
}
