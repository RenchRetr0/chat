import { ConnectedUser } from '@chat/entities/connected-user.entity';
import { ConnectedUserProperties } from '@chat/interfaces/connected-user.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ConnectedUserService
{
    constructor(
        @InjectRepository(ConnectedUser) private connectedUserRepository: Repository<ConnectedUser>
    ){}

    async create(connectedUserProperties: ConnectedUserProperties): Promise<ConnectedUser>
    {
        return await this.connectedUserRepository.save(connectedUserProperties);
    }

    async findByUser(user: User): Promise<ConnectedUser[]>
    {
        return await this.connectedUserRepository.find(
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

    async deleteBySocketId(socketId: string)
    {
        return this.connectedUserRepository.delete({socketId});
    }

    async deleteAll(): Promise<void>
    {
        await this.connectedUserRepository
        .createQueryBuilder()
        .delete()
        .execute();
    }
}
