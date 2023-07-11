import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { ProfileService } from './service/profile.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Profile])
    ],
    providers: [ProfileService],
    exports: [ProfileService],
})
export class ProfileModule {}
