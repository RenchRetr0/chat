import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProfileDto } from '@profile/dto/create-profile.dto';
import { Profile } from '@profile/entities/profile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileService 
{
    constructor (
        @InjectRepository(Profile) private profileRepository: Repository<Profile>
    ) {}

    async createProfile(createProfileDto: CreateProfileDto): Promise<Profile>
    {
        const profile: Profile = Profile.create({
            firstname: createProfileDto.firstName,
            lastname: createProfileDto.lastName
        });

        return await this.profileRepository.save(profile);
    }
}
