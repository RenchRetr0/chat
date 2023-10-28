import { JoinedRoom } from '@chat/entities/joined-room.entity';
import { Room } from '@chat/entities/room.entity';
import { JoinedRoomProperties } from '@chat/interfaces/joined-room.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JoinedRoomService
{
    constructor (
        @InjectRepository(JoinedRoom) private readonly joinedRoomRepository: Repository<JoinedRoom>
    ) {}

    async create(joinedRoom: JoinedRoomProperties): Promise<JoinedRoom>
    {
        return await this.joinedRoomRepository.save(joinedRoom);
    }

    async findByUser(user: User): Promise<JoinedRoom[]>
    {
        return await this.joinedRoomRepository.find(
            {
                where:
                {
                    user:
                    {
                        id: user.id
                    }
                }
            }
        );
    }

    async findByRoom(room: Room): Promise<JoinedRoom[]>
    {
        return this.joinedRoomRepository.find(
            {
                where: 
                {
                    room: 
                    {
                        id: room.id
                    }
                }
            }
        );
    }

    async deleteBySocketId(socketId: string)
    {
        return await this.joinedRoomRepository.delete({socketId});
    }

    async deleteAll(): Promise<void>
    {
        await this.joinedRoomRepository
        .createQueryBuilder()
        .delete()
        .execute();
    }
}
