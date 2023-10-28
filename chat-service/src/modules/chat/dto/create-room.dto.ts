import { CreateDto } from "@common/dto/base.dto";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "@user/entities/user.entity";

export class CreateRoomDto extends CreateDto
{
    @ApiProperty({
        type: String,
        required: true
    })
    readonly name!: string;

    @ApiProperty({
        type: String,
        required: false
    })
    readonly description?: string;

    @ApiProperty({
        type: [User],
        required: false
    })
    readonly users?: User[];
}