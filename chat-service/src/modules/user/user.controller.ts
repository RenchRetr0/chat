import { Body, Controller, Post, Get, Query, UseGuards, HttpCode } from '@nestjs/common';
import { UserService } from './service/user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { User } from './entities/user.entity';
import { RtGuard } from '@common/guards';
import { ApiTags, ApiOkResponse, ApiCreatedResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags("Users")
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @UseGuards(RtGuard)
    @HttpCode(200)
    @ApiOkResponse({
        description: "Find all users and paginate them",
        schema:
        {
            example:
            {
                "statusCode": 200,
                "message": "Ok",
                "data": {
                    "items": [
                    {
                        "id": 1,
                        "email": "retr0@mail.ru",
                        "login": "retr0",
                        "createdAt": "2023-07-11T16:37:08.578Z",
                        "updateAt": "2023-07-11T16:37:08.578Z"
                    },
                    {
                        "id": 2,
                        "email": "retr0_1@mail.ru",
                        "login": "retr0_1",
                        "createdAt": "2023-08-08T18:33:17.459Z",
                        "updateAt": "2023-08-08T18:33:17.459Z"
                    }
                    ],
                    "meta": {
                    "totalItems": 5,
                    "itemCount": 2,
                    "itemsPerPage": 2,
                    "totalPages": 3,
                    "currentPage": 1
                    },
                    "links": {
                    "first": "http://localhost:5000/api/users?limit=2",
                    "previous": "",
                    "next": "http://localhost:5000/api/users?page=2&limit=2",
                    "last": "http://localhost:5000/api/users?page=3&limit=2"
                    }
                }
            }
        }
    })
    @ApiBearerAuth()
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
    @HttpCode(200)
    @ApiBearerAuth()
    @ApiOkResponse({
        type: [User],
    })
    async findAllByLogin(@Query('login') login: string): Promise<User[]>
    {
        return await this.userService.findAllByLogin(login);
    }

    @Post('create')
    @HttpCode(201)
    @ApiCreatedResponse({
        schema: 
        {
            example:
            {
                "statusCode": 200,
                "message": "Created"
            }
        }
    })
    async create(@Body() createUserDto: CreateUserDto): Promise<void> {
        await this.userService.createUser(createUserDto);
    }
}
