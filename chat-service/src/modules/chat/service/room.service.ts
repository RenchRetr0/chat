import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IPaginationOptions, paginate, Pagination} from 'nestjs-typeorm-paginate';
import { User } from '@user/entities/user.entity';
import { Room } from '@chat/entities/room.entity';

@Injectable()
export class RoomService
{
    constructor (
        @InjectRepository(Room) private roomRepository: Repository<Room>
    ) {}

    async createRoom(room: Room, creator: User): Promise<Room>
    {
        const newRoom = await this.addCreatorToRoom(room, creator);
        return this.roomRepository.save(newRoom);
    }

    async getRoomsForUser(userId: number, options: IPaginationOptions): Promise<Pagination<Room>>
    {
        const query = this.roomRepository
            .createQueryBuilder('room')
            .leftJoin('room.users', 'users')
            .where('users.id = :userId', { userId })
            .leftJoinAndSelect('room.users', 'all_users')
            .orderBy('room.updatedAt', 'DESC');
        
        return paginate(query, options);
    }

    async addCreatorToRoom(room: Room, creator: User): Promise<Room>
    {
        room.users.push(creator);
        return await room;
    }
}
