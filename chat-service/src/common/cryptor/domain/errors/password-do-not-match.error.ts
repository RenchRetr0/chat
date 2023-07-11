import { ServiceError } from '@common/errors/service.error';
import { HttpStatus } from '@nestjs/common';

export class PasswordDoNotMatch extends ServiceError {
  constructor() {
    super('Password do not match, please check that you provided a correct password.', HttpStatus.BAD_REQUEST);
  }
}