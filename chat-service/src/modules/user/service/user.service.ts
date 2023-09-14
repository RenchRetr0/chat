import { EmailIsStatusService } from '@email-is-status/service/email-is-status.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileService } from '@profile/service/profile.service';
import { CreateUserDto } from '@user/dto/create-user.dto';
import { User } from '@user/entities/user.entity';
import { UserWithCurrentEmailAlreadyExists } from '@user/errors/user-with-current-email-exists.error';
import { UserWithCurrentLoginAlreadyExists } from '@user/errors/user-with-current-login-exists.error';
import { FindOptionsSelect, FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class UserService 
{
    constructor (
        @InjectRepository(User) private userRepository: Repository<User>,
        private profileService: ProfileService,
        private emailIsStatusService: EmailIsStatusService
    ) {}

    async createUser(createUserDto: CreateUserDto): Promise<User>
    {
        const login = createUserDto.login;
        const email = createUserDto.email;

        const existsWithCurrentLogin = await this.findOne({login});
        const existsWithCurrentEmail = await this.findOne({email});
        
        if (existsWithCurrentLogin) {
            throw new UserWithCurrentLoginAlreadyExists(login);
        }

        if (existsWithCurrentEmail) {
            throw new UserWithCurrentEmailAlreadyExists(email);
        }

        const profile = await this.profileService.createProfile(createUserDto.profile);

        const user: User = User.create({
            email: createUserDto.email,
            login: createUserDto.login,
            password: createUserDto.password,
            profile: profile
        });

        const userCreate: User = await this.userRepository.save(user);

        await this.emailIsStatusService.createEmailIsStatus(userCreate);

        return userCreate;
    }

    async findOne(userFilterQuery: FindOptionsWhere<User>, userOptionSelect?: FindOptionsSelect<User>): Promise<User> {
        return await this.userRepository.findOne({
          where: userFilterQuery,
          select: userOptionSelect
        });
    }
}
