import { User } from "@user/entities/user.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Room } from "./room.entity";
import { JoinedRoomProperties } from "@chat/interfaces/joined-room.interface";

@Entity('joinedRoom')
export class JoinedRoom extends BaseEntity implements JoinedRoomProperties
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 255
    })
    socketId: string;

    @ManyToOne(() => User, user => user.joinedRooms)
    @JoinColumn()
    user: User;

    @ManyToOne(() => Room, room => room.joinedUsers)
    @JoinColumn()
    room: Room;
}