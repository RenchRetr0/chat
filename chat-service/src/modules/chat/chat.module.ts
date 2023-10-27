import { Module } from '@nestjs/common';
import { ChatGateway } from './gateway/chat.gateway';
import { AuthModule } from '@auth/auth.module';
import { UserModule } from '@user/user.module';
import { RoomService } from './service/room.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { ConnectedUser } from './entities/connected-user.entity';
import { ConnectedUserService } from './service/connected-user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Room, ConnectedUser]),
    AuthModule,
    UserModule
  ],
  providers: [
    ChatGateway,
    RoomService,
    ConnectedUserService
  ]
})
export class ChatModule {}
