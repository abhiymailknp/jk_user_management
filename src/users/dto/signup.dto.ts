import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { PasswordBaseDto } from "./password.dto";
import { Role } from "src/constants/constants";

export class SignUpDto extends PasswordBaseDto {

    @IsString()
    @IsNotEmpty({ message: 'Full name is required.' })
    @MinLength(3, { message: 'Full name must be at least 3 characters long.' })
    fullName: string;

    @IsNotEmpty({ message: 'Email is required.' })
    @IsEmail()
    email: string;

    @IsString()
    @IsOptional()
    @IsEnum(Role, { message: 'role must be a viewer,editor,admin' })
    role : Role
}