import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/constants/constants';
import { User } from 'src/entities/user.entity';
import { TokenData } from 'src/interfaces/user.interface';
import { Not, Repository } from 'typeorm';

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(User) 
        private UserRepo : Repository<User>)  { }

        async findAllUsers(){
            const users = await this.UserRepo.find({
                select : ['userId','fullName','email','role','createdAt'],
                where : {role : Not(Role.admin)}
            });
            users.map((user)=>{
                user["userRole"] = Role[user.role]
            });
            return users;
        }

        async updateUserRole(role : Role , userId : string){
            console.log(role,userId);
            const updatedUser = await this.UserRepo.update(
                {userId : userId},
                {role : role}
            );
            // return updatedUser;
        }
}
