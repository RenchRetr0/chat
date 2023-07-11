import { CreateDto } from '@common/dto/base.dto';
import {
    IsNotEmpty,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';

export class CreateProfileDto extends CreateDto {
  @IsNotEmpty({ message: 'First name cannot be null.' })
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  readonly firstName!: string;

  @IsNotEmpty({ message: 'Last name cannot be null.' })
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  readonly lastName!: string;
}
