import { CreateDto } from "@common/dto/base.dto";
import { User } from "@user/entities/user.entity";

export class CreateRoomDto extends CreateDto
{
    readonly name!: string;
    readonly description?: string;
    readonly users?: User[];
}