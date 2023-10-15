import { RoomProperties } from "@chat/interfaces/room.interface";
import { User } from "@user/entities/user.entity";
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";

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

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updateAt?: Date;
}