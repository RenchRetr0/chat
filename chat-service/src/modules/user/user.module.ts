import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './service/user.service';
import { ProfileModule } from '@profile/profile.module';
import { EmailIsStatusModule } from '@email-is-status/email-is-status.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ProfileModule,
    EmailIsStatusModule
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
