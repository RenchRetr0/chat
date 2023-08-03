import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncConfig } from './config/typeorm.config';
import { UserModule } from './modules/user/user.module';
import { ProfileModule } from './modules/profile/profile.module';
import { EmailIsStatusModule } from '@email-is-status/email-is-status.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { mailerAsyncConfig } from './config/mailer.config';
import { AuthModule } from './modules/auth/auth.module';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
