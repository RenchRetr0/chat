import { hash } from 'bcrypt';
import { Exclude, Type } from 'class-transformer';
import {
    IsDate,
    IsEmail,
    IsNotEmpty,
    IsString,
} from 'class-validator';
import {
    BaseEntity,
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToMany,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { UserProperties } from '../interfaces/user.interface';
import { Profile } from '@profile/entities/profile.entity';
import { EmailIsStatus } from '@email-is-status/entities/email-is-status.entity';
import { Room } from '@chat/entities/room.entity';
import { ConnectedUser } from '@chat/entities/connected-user.entity';
import { JoinedRoom } from '@chat/entities/joined-room.entity';
import { Message } from '@chat/entities/message.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User extends BaseEntity implements UserProperties {

  @IsNotEmpty()
  @PrimaryGeneratedColumn()
  @ApiProperty({
    type: Number,
    required: true
  })
  id: number;

  @IsNotEmpty()
  @IsEmail()
  @Column({
    type: 'varchar',
    unique: true,
    length: 256,
  })
  @ApiProperty({
    type: String,
    required: true
  })
  email!: string;

  @IsNotEmpty()
  @Column({
    type: 'varchar',
    unique: true,
    length: 256,
  })
  @ApiProperty({
    type: String,
    required: true
  })
  login!: string;

  @Exclude()
  @IsNotEmpty()
  @IsString()
  @Column({
    type: 'varchar',
    length: 120,
    select: false
  })
  @ApiProperty({
    type: String,
    required: true
  })
  password!: string;

  @OneToMany(() => ConnectedUser, connection => connection.user)
  @ApiProperty({
    type: [ConnectedUser],
    required: false
  })
  connections: ConnectedUser[];

  @Type(() => Profile)
  @OneToOne(() => Profile)
  @JoinColumn()
  @ApiProperty({
    type: Profile,
    required: false
  })
  profile: Profile;

  @ManyToMany(() => Room, room => room.users)
  rooms: Room[];

  @Type(() => EmailIsStatus)
  @OneToOne(() => EmailIsStatus, (emailIsStatus) => emailIsStatus.user)
  emailIsStatus: EmailIsStatus;

  @OneToMany(() => JoinedRoom, joinedRoom => joinedRoom.room)
  joinedRooms: JoinedRoom[];

  @OneToMany(() => Message, message => message.user)
  messages: Message[];

  @IsDate()
  @CreateDateColumn()
  createdAt?: Date;

  @IsDate()
  @UpdateDateColumn()
  updateAt?: Date;

  @BeforeInsert()
  async setPassword(password: string) {
    this.password = await hash(password || this.password, 10);
  }
}
