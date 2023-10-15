import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncConfig } from './config/typeorm.config';
import { UserModule } from '@user/user.module';
import { ProfileModule } from '@profile/profile.module';
import { EmailIsStatusModule } from '@email-is-status/email-is-status.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { mailerAsyncConfig } from './config/mailer.config';
import { AuthModule } from '@auth/auth.module';
import { ChatModule } from '@chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    MailerModule.forRootAsync(mailerAsyncConfig),
    UserModule,
    ProfileModule,
    EmailIsStatusModule,
    MailerModule,
    AuthModule,
    ChatModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
