/**
 * Password cryptor use-case symbol is an injection token.
 *
 * @description This constant as an alias for the DI process ({@link https://ru.wikipedia.org/wiki/Внедрение_зависимости | dependency injection}).
 */
export const PasswordCryptorUseCaseSymbol: symbol = Symbol('PasswordCryptorUseCase');

/**
 * Password cryptor use-case.
 *
 * @description Password cryptor interface describes a basic contract of the password hashing and comparing.
 * Password cryptor service must implement this class.
 */
export interface PasswordCryptorUseCase {
  /**
   * Hashes plain password data asynchronously.
   *
   * @param plainPassword plain password string.
   * @returns either error or string promise.
   * @see [ServiceReturnType](./../../../types/service-return.type.ts)
   */
  hash(plainPassword: string): Promise<string>;

  /**
   * Hashes plain password data synchronously.
   *
   * @param plainPassword plain password string.
   * @returns either error or string.
   * @see [ServiceReturnType](./../../../types/service-return.type.ts)
   */
  hashSync(plainPassword: string): string;

  /**
   * Compares plain password data with password hash asynchronously.
   *
   * @param plainPassword plain password string.
   * @param passwordHash password hash string.
   * @returns either error or boolean promise.
   * @see [ServiceReturnType](./../../../types/service-return.type.ts)
   */
  compare(plainPassword: string, passwordHash: string): Promise<boolean>;

  /**
   * Compares plain password data with password hash synchronously.
   *
   * @param plainPassword plain password string.
   * @param passwordHash password hash string.
   * @returns either error or boolean.
   * @see [ServiceReturnType](./../../../types/service-return.type.ts)
   */
  compareSync(plainPassword: string, passwordHash: string): boolean;
}