import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './service/auth.service';
import { AtStrategy, RtStrategy } from './strategies';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '@user/user.module';

@Module({
  imports: [
    JwtModule.register({}),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AtStrategy,
    RtStrategy
  ]
})
export class AuthModule {}
