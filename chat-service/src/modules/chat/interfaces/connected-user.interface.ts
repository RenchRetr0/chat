import { User } from "@user/entities/user.entity";

export interface ConnectedUserProperties
{
    socketId: string;
    user: User;
}