import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Role } from "src/constants/constants";

export class UpdateRoleDto{

    @IsEnum(Role, { message: 'role must be a viewer,editor,admin' })
    @IsNotEmpty({ message: 'role is required.' })
    role : Role

    @IsString()
    @IsNotEmpty({ message: 'UserId is required.' })
    userId: string
}