import { HttpStatus } from '@nestjs/common';

/**
 * Abstract service error class.
 *
 * @description This abstract class incapsulates basic service error properties
 * that every service error must have. This properties are:
 * - `message` – a human-readable error message that describes what was wrong;
 * - `status` – internal numeric status code.
 */
export abstract class ServiceError extends Error {
  /**
   * Internal numeric status code.
   */
  public readonly status!: number;

  /**
   * Creates new service error.
   *
   * @param message error human-readable message.
   * @param status internal numeric status code.
   */
  constructor(message: string, status?: number) {
    super(message);
    this.status = status ?? HttpStatus.INTERNAL_SERVER_ERROR;
  }
}