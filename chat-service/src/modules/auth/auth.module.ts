import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './service/auth.service';
import { AtStrategy, RtStrategy } from './strategies';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '@user/user.module';
import { jwtConfig } from '@config/jwt.config';

@Module({
  imports: [
    JwtModule.registerAsync(jwtConfig),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AtStrategy,
    RtStrategy
  ],
  exports: [AuthService]
})
export class AuthModule {}
