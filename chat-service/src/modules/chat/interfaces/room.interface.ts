import { TimestampEntity } from "@common/interfaces/timestamp.entity";
import { User } from "@user/entities/user.entity";

export interface RoomProperties extends TimestampEntity
{
    name: string;
    users?: User[];
    description: string;
}