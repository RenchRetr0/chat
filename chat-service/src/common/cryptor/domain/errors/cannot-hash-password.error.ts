import { ServiceError } from '@common/errors/service.error';

export class CannotHashPassword extends ServiceError {
  constructor() {
    super('Cannot hash password, please try later.');
  }
}