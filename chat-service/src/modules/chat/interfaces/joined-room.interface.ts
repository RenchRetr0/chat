import { Room } from "@chat/entities/room.entity";
import { User } from "@user/entities/user.entity";

export interface JoinedRoomProperties
{
    socketId: string;
    user: User;
    room: Room;
}