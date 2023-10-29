import { MailerOptions } from "@nestjs-modules/mailer";
import { createTransport } from "nodemailer";
import { MailerAsyncOptions } from "@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface";
import { ConfigModule, ConfigService } from "@nestjs/config";

export const mailerAsyncConfig: MailerAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (
        configService: ConfigService,
    ) : Promise<MailerOptions> => {
        return {
            transport:  {
                service: 'gmail',
                host: await configService.get<string>('APP_EMAIL_SMTP'),
                port: 465,
                secure: true,
                auth: {
                    user: await configService.get<string>('APP_EMAIL_USER'),
                    pass: await configService.get<string>('APP_EMAIL_PASS'),
                },
            },
        };
    }
}