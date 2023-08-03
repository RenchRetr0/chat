import { Body, Controller, Post } from '@nestjs/common';
import { EmailIsStatusService } from './service/email-is-status.service';
import { TestDto } from './dto/test.dto';

@Controller('email-is-status')
export class EmailIsStatusController {
    constructor(private readonly emailIsStatusService: EmailIsStatusService) {}

    @Post()
    async emailSend(@Body() test: TestDto): Promise<void>
    {
        return await this.emailIsStatusService.mailer(test.email);
    }
}
