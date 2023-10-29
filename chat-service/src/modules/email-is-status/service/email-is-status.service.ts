import { EmailIsStatus } from '@email-is-status/entities/email-is-status.entity';
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@user/entities/user.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailIsStatusService 
{
    constructor (
        @InjectRepository(EmailIsStatus) private emailIsStatusRepository: Repository<EmailIsStatus>,
        private readonly mailerService: MailerService,
        private readonly configService: ConfigService
    ) {}

    async createEmailIsStatus(user: User): Promise<EmailIsStatus>
    {
        const emailIsStatus = EmailIsStatus.create({
            user: user
        });

        await this.sendConfirmationLink(user.email);

        return await this.emailIsStatusRepository.save(emailIsStatus);
    }

    async decryptMail(strNumEmail: string): Promise<string>
    {
        const arrHexEmail = strNumEmail.match(/.{1,2}/g);

        const decodedEmail = arrHexEmail.map(hexChar => String.fromCharCode(parseInt(hexChar, 16))).join('');

        return decodedEmail;
    }

    async emailConfirmed(userId: number)
    {
        const emailFalse = await this.emailIsStatusRepository.findOne({
            where:
            {
                user:
                {
                    id: userId
                }
            }
        });
        emailFalse.isStatus = true;
        await this.emailIsStatusRepository.save(emailFalse);
    }

    async sendConfirmationLink(email: string): Promise<void>
    {
        const encryptedMail = await this.encryptMail(email);

        await this.mailerService.sendMail({
            to: email,
            from: 'retro.rench00@gmail.com',
            subject: 'Подтверждение почты',
            html: `Для подтвержденяи почты преейдите по <a href="${this.configService.get<string>('APP_DOMAIN')}/${encryptedMail}"> ссылке </a>`
        });

    }

    private async encryptMail(email: string): Promise<string>
    {
        const arrCharEmail = [...email];

        const arrHexEmail = arrCharEmail.map(char => char.charCodeAt(0).toString(16));
        const strNumEmail = arrHexEmail.join('');

        return strNumEmail;
    }
}
