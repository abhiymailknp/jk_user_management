import { IsNotEmpty, Matches } from 'class-validator';
import { passwordRegex } from 'src/constants/constants';


export class PasswordBaseDto {
  @IsNotEmpty({ message: 'Password is required.' })
  @Matches(passwordRegex, {
    message: 'Password must be 8-16 characters long, include at least one uppercase letter, one number, and one special character.',
  })
  password: string;
}