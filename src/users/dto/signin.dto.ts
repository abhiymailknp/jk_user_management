import { IsEmail, IsNotEmpty } from "class-validator";
import { PasswordBaseDto } from "./password.dto";

export class SignInDto extends PasswordBaseDto {
    @IsNotEmpty({ message: 'Email is required.' })
    @IsEmail()
    email: string;
}