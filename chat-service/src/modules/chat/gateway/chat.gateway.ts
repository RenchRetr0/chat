import {
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayDisconnect,
  WebSocketServer
} from '@nestjs/websockets';
import { UnauthorizedException, OnModuleInit } from '@nestjs/common';
import { Socket } from 'socket.io';
import { AuthService } from '@auth/service/auth.service';
import { UserService } from '@user/service/user.service';
import { User } from '@user/entities/user.entity';
import { RoomService } from '@chat/service/room.service';
import { Room } from '@chat/entities/room.entity';
import { PageProperties } from '@chat/interfaces/page.interface';
import { ConnectedUserService } from '@chat/service/connected-user.service';
import { ConnectedUser } from '@chat/entities/connected-user.entity';
import { JoinedRoomService } from '@chat/service/joined-room.service';
import { MessageService } from '@chat/service/message.service';
import { Message } from '@chat/entities/message.entity';
import { JoinedRoom } from '@chat/entities/joined-room.entity';

@WebSocketGateway({
  cors: {
    origin: 'https://hoppscotch.io'
  }
})

export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect, OnModuleInit {

  @WebSocketServer()
  server;

  constructor (
    private authService: AuthService,
    private userService: UserService,
    private roomService: RoomService,
    private connectedUserService: ConnectedUserService,
    private joinedRoomService: JoinedRoomService,
    private messageService: MessageService
  ) {}

  async onModuleInit(): Promise<void>
  {
      await this.connectedUserService.deleteAll();
      await this.joinedRoomService.deleteAll();
  }

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

        // Save connection to DB
        await this.connectedUserService.create({socketId: socket.id, user})

        // Only emit rooms to the specific connected client
        return this.server.to(socket.id).emit('rooms', rooms);
      }

    } catch {
      return this.disconnect(socket);
    }
    
  }

  async handleDisconnect(socket: Socket): Promise<void>
  {
    // remove connection from DB
    await this.connectedUserService.deleteBySocketId(socket.id);
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
    const createRoom: Room = await this.roomService.createRoom(room, socket.data.user);

    for(const user of createRoom.users)
    {
      const connections: ConnectedUser[] = await this.connectedUserService.findByUser(user);
      const rooms = await this.roomService.getRoomsForUser(user.id, {page: 1, limit: 10});
      // substract page -1 to match the angular meterial paginator
      rooms.meta.currentPage = rooms.meta.currentPage - 1;
      for(const connection of connections)
      {
        await this.server.to(connection.socketId).emit('rooms', rooms);
      }
    }
    return createRoom;
  }

  @SubscribeMessage('paginateRoom')
  async onPaginateRoom(socket: Socket, page: PageProperties)
  {
    const pageRequest = await this.handlerIncomingPageRequest(page);
    const rooms = await this.roomService.getRoomsForUser(socket.data.user.id, pageRequest);
    // substract page -1 to metch the angular material paginator
    rooms.meta.currentPage = rooms.meta.currentPage - 1;
    return this.server.to(socket.id).emit('rooms', rooms);
  }

  @SubscribeMessage('joinRoom')
  async onJoinRoom(socket: Socket, room: Room)
  {
    const messages = await this.messageService.findByMessagesForRoom(room, {limit: 10, page: 1});
    messages.meta.currentPage = messages.meta.currentPage - 1;

    // Save Connection to Room
    await this.joinedRoomService.create({socketId: socket.id, user: socket.data.user, room});
    // Send last message from Room to User
    await this.server.to(socket.id).emit('messages', messages)

  }

  @SubscribeMessage('leaveRoom')
  async onLeaveRoom(socket: Socket)
  {
    // remove connection from JoinedRooms
    await this.joinedRoomService.deleteBySocketId(socket.id);
  }

  @SubscribeMessage('addMessage')
  async onAddMessage(socket: Socket, message: Message)
  {
    const createdMessage: Message = await this.messageService.create(
      {
        ...message, user: socket.data.user
      }
    );
    const room: Room = await this.roomService.getRoom(createdMessage.room.id);
    const joinedUsers: JoinedRoom[] = await this.joinedRoomService.findByRoom(room);
    // TODO: Send new Message to all joined Users of the room (currently online)
    for(const user of joinedUsers)
    {
      await this.server.to(user.socketId).emit('messageAdded', createdMessage);
    }
  }

  private async handlerIncomingPageRequest(page: PageProperties): Promise<PageProperties>
  {
    page.limit = page.limit > 100 ? 100 : page.limit;
    // add page +1 to match angular material paginator
    page.page = page.page + 1;
    return page;
  }
}
