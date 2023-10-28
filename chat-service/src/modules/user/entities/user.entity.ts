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

@Entity('users')
export class User extends BaseEntity implements UserProperties {

  @IsNotEmpty()
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsEmail()
  @Column({
    type: 'varchar',
    unique: true,
    length: 256,
  })
  email!: string;

  @IsNotEmpty()
  @Column({
    type: 'varchar',
    unique: true,
    length: 256,
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
  password!: string;

  @OneToMany(() => ConnectedUser, connection => connection.user)
  connections: ConnectedUser[];

  @Type(() => Profile)
  @OneToOne(() => Profile)
  @JoinColumn()
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
