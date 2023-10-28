import { CreateDto } from '@common/dto/base.dto';
import { CreateProfileDto } from '@profile/dto/create-profile.dto';
import { Transform, Type } from 'class-transformer';
import { 
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsString,
  Matches,
  MinLength,
  ValidateNested
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MESSAGE, REGEX } from 'src/app.utils';

export class CreateUserDto extends CreateDto {
  @IsNotEmpty({ message: 'Email cannot be empty.' })
  @IsEmail()
  @Transform(({ value }) => (value as string).toLowerCase())
  @ApiProperty(
    {
      type: String,
      required: true
    }
  )
  readonly email!: string;

  @IsNotEmpty({ message: 'Login cannot be empty.' })
  @ApiProperty(
    {
      type: String,
      required: true
    }
  )
  readonly login!: string;

  @IsNotEmpty({ message: 'Password cannot be empty.' })
  @IsString()
  @MinLength(6)
  @Matches(REGEX.PASSWORD_RULE, { message: MESSAGE.PASSWORD_RULE_MESSAGE })
  @ApiProperty(
    {
      type: String,
      required: true
    }
  )
  readonly password!: string;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => CreateProfileDto)
  @ApiProperty(
    {
      type: CreateProfileDto,
      required: true
    }
  )
  readonly profile!: CreateProfileDto;
}
