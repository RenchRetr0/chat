import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { EmailIsStatusProperties } from "../interfaces/email-is-status.interface";
import { IsDate, IsNotEmpty } from "class-validator";
import { Type } from "class-transformer";
import { User } from "@user/entities/user.entity";

@Entity('emailIsStatus')
export class EmailIsStatus extends BaseEntity implements EmailIsStatusProperties
{
    @IsNotEmpty()
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Type(() => User)
    @OneToOne(() => User)
    @JoinColumn()
    user: User;

    @IsNotEmpty()
    @Column({
        type: 'boolean',
        default: false
    })
    isStatus: boolean;

    @IsDate()
    @CreateDateColumn()
    createdAt?: Date;

    @IsDate()
    @UpdateDateColumn()
    updateAt?: Date;
}