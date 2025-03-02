import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { ResponseService } from 'src/utils/response.service';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]),UsersModule],
  controllers: [AdminController],
  providers: [AdminService , ResponseService]
})
export class AdminModule {}
