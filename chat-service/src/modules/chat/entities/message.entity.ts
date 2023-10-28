import { User } from "@user/entities/user.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Room } from "./room.entity";
import { MessageProperties } from "@chat/interfaces/message.interface";

@Entity('message')
export class Message extends BaseEntity implements MessageProperties
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar'
    })
    text: string;

    @ManyToOne(() => User, user => user.messages)
    @JoinColumn()
    user: User;

    @ManyToOne(() => Room, room => room.messages)
    @JoinTable()
    room: Room;

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updateAt?: Date;
}