import { HttpException, HttpStatus } from '@nestjs/common';

export class UsersUnauthorized extends HttpException {
  constructor() {
    super(
      {
        message: 'Login or password entered is incorrect.',
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
