import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { SignUpDto } from './dto/signup.dto';
import { Role } from 'src/constants/constants';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) 
        private UserRepo : Repository<User>){}

    async findUserByEmail(email : string){
        const user = await this.UserRepo.findOne({
            where:{
                email
            }
        })
        return user;
    }

    async userSignUp(payload : SignUpDto ){
        const userEntity = await this.UserRepo.create({...payload})
        const user = await this.UserRepo.save(userEntity);
        return user;
    }
}