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
import { RoomService } from '@chat/service/room.service';
import { Room } from '@chat/entities/room.entity';
import { PageProperties } from '@chat/interfaces/page.interface';

@WebSocketGateway({
  cors: {
    origin: 'https://hoppscotch.io'
  }
})

export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  server;

  constructor (
    private authService: AuthService,
    private userService: UserService,
    private roomService: RoomService
  ) {}

  async handleConnection(socket: Socket) {
    try {
      const decodedToken = await this.authService.verifyJwt(socket.handshake.headers.authorization);
      const user: User = await this.userService.findOne({id: decodedToken.sub});

      if ( !user )
      {
        return this.disconnect(socket);
      }
      else
      {
        socket.data.user = user;
        const rooms = await this.roomService.getRoomsForUser(user.id, {page: 1, limit: 10});
        // substract page -1 to metch the angular material paginator
        rooms.meta.currentPage = rooms.meta.currentPage - 1;

        // Only emit rooms to the specific connected client
        return this.server.to(socket.id).emit('rooms', rooms);
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

  @SubscribeMessage('createRoom')
  async onCreateRoom(socket: Socket, room: Room): Promise<Room>
  {
    return this.roomService.createRoom(room, socket.data.user);
  }

  @SubscribeMessage('paginateRoom')
  async onPaginateRoom(socket: Socket, page: PageProperties)
  {
    page.limit = page.limit > 100 ? 100 : page.limit;
    // add page +1 to match angular material paginator
    page.page = page.page + 1;
    const rooms = await this.roomService.getRoomsForUser(socket.data.user.id, page);
    // substract page -1 to metch the angular material paginator
    rooms.meta.currentPage = rooms.meta.currentPage - 1;
    return this.server.to(socket.id).emit('rooms', rooms);
  }
}
