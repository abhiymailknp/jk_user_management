import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { SignUpDto } from './dto/signup.dto';
import { Role } from 'src/constants/constants';
import { AddUser } from 'src/interfaces/user.interface';

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

    async findUserByUserId(userId : string){
        const user = await this.UserRepo.findOne({
            where:{
                userId
            }
        })
        return user;
    }

    async findAllUsers(){
        const users = await this.UserRepo.find();
        return users;
    }

    async userSignUp (payload : SignUpDto ): Promise<AddUser>{
        const userEntity = this.UserRepo.create({...payload})
        const user : User= await this.UserRepo.save(userEntity);
        return {
            userId : user.userId,
            fullName : user.fullName,
            email : user.email,
            role : user.role,
            createdAt : user.createdAt
        };
    }
}