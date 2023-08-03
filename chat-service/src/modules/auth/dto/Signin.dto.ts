import { IsNotEmpty, IsString, Length, Matches } from "class-validator";
import { MESSAGE, REGEX } from "src/app.utils";

export class SignInDto
{
    @IsNotEmpty({ message: 'Login cannot be empty.' })
    @IsString()
    login: string;

    @IsNotEmpty({ message: 'Password cannot be empty.' })
    @Length(8)
    @Matches(REGEX.PASSWORD_RULE, { message: MESSAGE.PASSWORD_RULE_MESSAGE })
    password: string;
}