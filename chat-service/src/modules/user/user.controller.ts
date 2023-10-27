import { Body, Controller, Post, Get, Query, UseGuards } from '@nestjs/common';
import { UserService } from './service/user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { User } from './entities/user.entity';
import { RtGuard } from '@common/guards';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async findAll(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10
    ): Promise<Pagination<User>>
    {
        limit = limit > 100 ? 100 : limit;
        return await this.userService.findAll({ page, limit, route: 'http://localhost:5000/api/users' });
    }

    @UseGuards(RtGuard)
    @Get('/find-by-login')
    async findAllByLogin(@Query('login') login: string): Promise<User[]>
    {
        return await this.userService.findAllByLogin(login);
    }

    @Post('create')
    async create(@Body() createUserDto: CreateUserDto): Promise<void> {
        await this.userService.createUser(createUserDto);
    }
}
