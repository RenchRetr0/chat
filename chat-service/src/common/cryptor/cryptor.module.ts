import { PasswordCryptorService } from '@common/cryptor/domain/services/password-cryptor.service';
import { PasswordCryptorUseCaseSymbol } from '@common/cryptor/domain/use-cases/password-cryptor.use-case';
import { Module, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const providers: Provider[] = [
  {
    provide: PasswordCryptorUseCaseSymbol,
    useFactory: (configService: ConfigService) => {
      return new PasswordCryptorService(configService);
    },
    inject: [ConfigService],
  },
];

@Module({
  providers: [...providers],
  exports: [...providers],
})
export class CryptorModule {}