import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { ResponseService } from 'src/utils/response.service';

@Module({
  imports :[TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService,ResponseService]
})
export class UsersModule {}
