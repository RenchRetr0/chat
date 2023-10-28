import { RoomProperties } from "@chat/interfaces/room.interface";
import { User } from "@user/entities/user.entity";
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { JoinedRoom } from "./joined-room.entity";
import { Message } from "./message.entity";

@Entity()
export class Room extends BaseEntity implements RoomProperties
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 255
    })
    name: string;

    @Column({
        type: 'varchar',
        nullable: true,
        length: 255
    })
    description: string;

    @ManyToMany(() => User)
    @JoinTable()
    users: User[];

    @OneToMany(() => JoinedRoom, joinedRoom => joinedRoom.room)
    joinedUsers: JoinedRoom[];

    @OneToMany(() => Message, message => message.room)
    messages: Message[];

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updateAt?: Date;
}