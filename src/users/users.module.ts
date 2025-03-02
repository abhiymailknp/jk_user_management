import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { ResponseService } from 'src/utils/response.service';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports :[TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService,ResponseService,AuthService],
  exports : [UsersService]
})
export class UsersModule {}
