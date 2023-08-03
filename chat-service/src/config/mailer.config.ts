import { MailerOptions } from "@nestjs-modules/mailer";
import { MailerAsyncOptions } from "@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface";
import { ConfigModule, ConfigService } from "@nestjs/config";

export const mailerAsyncConfig: MailerAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (
        configService: ConfigService,
    ) : Promise<MailerOptions> => {
        return {
            transport: {
                host: 'smtp.mail.ru',
                port: 465,
                secure: true,
                auth: {
                    user: configService.get<string>('APP_EMAIL_USER'),
                    pass: configService.get<string>('APP_EMAIL_PASS'),
                },
            },
        };
    }
}