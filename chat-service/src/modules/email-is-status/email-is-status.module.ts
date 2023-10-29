import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailIsStatus } from './entities/email-is-status.entity';
import { EmailIsStatusService } from './service/email-is-status.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([EmailIsStatus]),
    ],
    providers: [EmailIsStatusService],
    exports: [EmailIsStatusService]
})
export class EmailIsStatusModule {}
