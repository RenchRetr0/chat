import { Room } from "@chat/entities/room.entity";
import { TimestampEntity } from "@common/interfaces/timestamp.entity";
import { User } from "@user/entities/user.entity";

export interface MessageProperties extends TimestampEntity
{
    text: string;
    user: User;
    room: Room;
}