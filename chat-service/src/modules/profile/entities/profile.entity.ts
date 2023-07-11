import { ProfielProperties } from "@profile/interfaces/profile.interface";
import { User } from "@user/entities/user.entity";
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsString } from "class-validator";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('profiles')
export class Profile extends BaseEntity implements ProfielProperties
{
    @IsNotEmpty()
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @IsString()
    @Column({
        type: 'varchar',
        length: 120,
    })
    firstname: string;

    @IsNotEmpty()
    @IsString()
    @Column({
        type: 'varchar',
        length: 120,
    })
    lastname: string;

    @Type(() => User)
    @OneToOne(() => User, (user) => user.profile)
    user: User;

    @IsDate()
    @CreateDateColumn()
    createdAt?: Date;

    @IsDate()
    @UpdateDateColumn()
    updateAt?: Date;
}