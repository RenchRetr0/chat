import { Message } from '@chat/entities/message.entity';
import { Room } from '@chat/entities/room.entity';
import { MessageProperties } from '@chat/interfaces/message.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';

@Injectable()
export class MessageService
{
    constructor (
        @InjectRepository(Message) private readonly messageRepository: Repository<Message>
    ) {}

    async create(message: MessageProperties): Promise<Message>
    {
        const createMessage = this.messageRepository.create(message);
        return await this.messageRepository.save(createMessage);
    }

    async findByMessagesForRoom(room: Room, options: IPaginationOptions): Promise<Pagination<Message>>
    {
        const query = this.messageRepository
        .createQueryBuilder()
        .leftJoin('message.room', 'room')
        .where('room.id = :roomId', {roomId: room.id})
        .leftJoinAndSelect('message.user', 'user')
        .orderBy('message.createdAt', 'ASC');

        return paginate(query, options);
    }
}