import { HttpException, HttpStatus } from '@nestjs/common';

export class UsersNotFound extends HttpException {
  constructor() {
    super(
      {
        message: 'User not found, please try later.',
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
