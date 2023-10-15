import { Room } from "@chat/entities/room.entity";
import { EmailIsStatus } from "@email-is-status/entities/email-is-status.entity";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Profile } from "@profile/entities/profile.entity";
import { User } from "@user/entities/user.entity";

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (
        configService: ConfigService,
    ): Promise<TypeOrmModuleOptions> => {
        return {
            type: 'postgres',
            host: configService.get<string>('APP_DB_HOST'),
            port: configService.get<number>('APP_DB_PORT'),
            username: configService.get<string>('APP_DB_USERNAME'),
            database: configService.get<string>('APP_DB_NAME'),
            password: configService.get<string>('APP_DB_PASSWORD'),
            entities: [User, Profile, EmailIsStatus, Room],
            autoLoadEntities: true,
            synchronize: true,
            logging: false,
        };
    },
}