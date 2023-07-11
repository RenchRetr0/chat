import { HttpException, HttpStatus } from '@nestjs/common';

export class UserWithCurrentLoginAlreadyExists extends HttpException {
  constructor(login: string) {
    super(
      {
        message: `Cannot update login. User with current 'login' already exists: ${login}.`,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
