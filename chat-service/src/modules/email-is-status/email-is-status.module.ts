import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailIsStatus } from './entities/email-is-status.entity';
import { EmailIsStatusService } from './service/email-is-status.service';
import { EmailIsStatusController } from './email-is-status.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([EmailIsStatus]),
        // MailerModule.forRoot()
    ],
    controllers: [EmailIsStatusController],
    providers: [EmailIsStatusService],
    exports: [EmailIsStatusService]
})
export class EmailIsStatusModule {}
