import {
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayDisconnect,
  WebSocketServer
} from '@nestjs/websockets';
import { UnauthorizedException } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { AuthService } from '@auth/service/auth.service';
import { UserService } from '@user/service/user.service';
import { User } from '@user/entities/user.entity';

@WebSocketGateway({
  cors: {
    origin: 'https://hoppscotch.io'
  }
})

export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  server;

  title: string[] = [];

  constructor (
    private authService: AuthService,
    private userService: UserService
  ) {}

  async handleConnection(socket: Socket) {
    try {
      const decodedToken = await this.authService.verifyJwt(socket.handshake.auth.token);
      const user: User = await this.userService.findOne({id: decodedToken.sub});

      if ( !user )
      {
        return this.disconnect(socket);
      }
      else
      {
        this.title.push('Value' + Math.random().toString());
        this.server.emit('message', this.title);
      }

    } catch {
      return this.disconnect(socket);
    }
    
  }

  handleDisconnect(socket: Socket) {
    socket.disconnect();
  }

  private disconnect(socket: Socket)
  {
    socket.emit('Error', new UnauthorizedException());
    socket.disconnect();
  }
}
