import { ConnectedUserProperties } from "@chat/interfaces/connected-user.interface";
import { ApiProperty } from "@nestjs/swagger";
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
    @ApiProperty({
        type: Number,
        required: true
    })
    id: number;

    @Column({
        type: 'varchar',
        length: 255
    })
    @ApiProperty({
        type: Number,
        required: true
    })
    socketId!: string;

    @ManyToOne(() => User)
    @JoinColumn()
    @ApiProperty({
        type: User,
        required: true
    })
    user: User;

}