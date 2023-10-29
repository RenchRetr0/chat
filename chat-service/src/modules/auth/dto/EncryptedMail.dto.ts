import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class EncryptedMailDto
{
    @IsString()
    @IsNotEmpty({ message: 'Encrypted mail cannot be empty.'})
    @ApiProperty({
        required: true,
        type: String
    })
    strNumEmail: string;
}