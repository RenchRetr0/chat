import { EmailIsStatus } from '@email-is-status/entities/email-is-status.entity';
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmailIsStatusService 
{
    constructor (
        @InjectRepository(EmailIsStatus) private emailIsStatusRepository: Repository<EmailIsStatus>,
        private readonly mailerService: MailerService
    ) {}

    async createEmailIsStatus(user: User): Promise<EmailIsStatus>
    {
        const emailIsStatus = EmailIsStatus.create({
            user: user
        });

        return await this.emailIsStatusRepository.save(emailIsStatus);
    }

    async mailer(email: string)
    {
        const emailSend = await this.mailerService.sendMail({
            to: email,
            from: 'retro.rench00@gmail.com',
            subject: 'Тестовое письмо.',
            text: 'Hello World!'
        });

        console.log(emailSend);

        return emailSend;
    }
}
