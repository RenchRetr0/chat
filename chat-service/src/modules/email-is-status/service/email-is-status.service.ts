import { EmailIsStatus } from '@email-is-status/entities/email-is-status.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmailIsStatusService 
{
    constructor (
        @InjectRepository(EmailIsStatus) private emailIsStatusRepository: Repository<EmailIsStatus>,
    ) {}

    async createEmailIsStatus(user: User): Promise<EmailIsStatus>
    {
        const emailIsStatus = EmailIsStatus.create({
            user: user
        });

        return await this.emailIsStatusRepository.save(emailIsStatus);
    }
}
