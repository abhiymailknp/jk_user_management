import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { encryptHashPassword } from 'src/utils/appUtil';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
      ) {}

      async signIn(
        username: string,
        pass: string,
      ): Promise<string> {
        let passwordHash ;
        const user = await this.userService.findUserByEmail(username);
        if(user?.salt)
        {
            passwordHash = await encryptHashPassword(pass, user?.salt);
        }
        if (user?.password !== passwordHash) {
          throw new UnauthorizedException({ message: 'Invalid credentials' });
        }
        const payload = { sub: user?.userId, email: user?.email , role : user?.role};
        const access_token = await this.jwtService.signAsync(payload);
        return access_token;
      }

}
