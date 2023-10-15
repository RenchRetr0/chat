import { Module } from '@nestjs/common';
import { ChatGateway } from './gateway/chat/chat.gateway';
import { AuthModule } from '@auth/auth.module';
import { UserModule } from '@user/user.module';
import { RoomService } from './service/room.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Room]),
    AuthModule,
    UserModule
  ],
  providers: [
    ChatGateway,
    RoomService
  ]
})
export class ChatModule {}
