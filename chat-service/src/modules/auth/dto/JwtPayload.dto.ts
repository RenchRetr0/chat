import { ApiProperty } from "@nestjs/swagger";

export class JwtPayloadDto
{
    @ApiProperty({
        type: Number,
    })
    sub: number;
    login: string;
}