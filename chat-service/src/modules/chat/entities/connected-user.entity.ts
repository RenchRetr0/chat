import { ConnectedUserProperties } from "@chat/interfaces/connected-user.interface";
import { User } from "@user/entities/user.entity";
import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm";

@Entity('connectedUser')
export class ConnectedUser extends BaseEntity implements ConnectedUserProperties
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 255
    })
    socketId!: string;

    @ManyToOne(() => User)
    @JoinColumn()
    user: User;

}