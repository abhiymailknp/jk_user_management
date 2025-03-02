import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import * as dotenv from 'dotenv';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ResponseService } from 'src/utils/response.service';

dotenv.config();

@Module({
  imports :[
    UsersModule,
    JwtModule.register({
      global : true,
      secret : process.env.JWT_SECRET,
      signOptions : {expiresIn : '1d'}
    })
  ],
  providers: [AuthService, ResponseService]
})
export class AuthModule {}

