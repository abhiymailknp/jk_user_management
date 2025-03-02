import { Body, Controller, Get, Param, Put, Req, Res, UseGuards, ValidationPipe } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ResponseService } from 'src/utils/response.service';
import { UsersService } from 'src/users/users.service';
import { Request, Response } from 'express';
import { AdminJwtAuthGuard } from 'src/guards/admin-jwt-auth.guard';
import { Role } from 'src/constants/constants';
import { UpdateRoleDto } from 'src/users/dto/updateRole.dto';
import { TokenData } from 'src/interfaces/user.interface';
@Controller('admin')
export class AdminController {
    constructor(
        private readonly adminService: AdminService,
        private readonly responseService: ResponseService,
        private readonly userService : UsersService
    ) { }

    @Get('/users')
    @UseGuards(AdminJwtAuthGuard)
    async getUsers(
        @Req() req: Request,
        @Res() res: Response) {
        try {
            const users =await this.adminService.findAllUsers();
            if(users)  
                this.responseService.sendSuccessResponse(res, { data: users }, "Users Fetched Successfully");
            else
                this.responseService.sendNotFount(res, "No Users Found");
        } catch (error) {
            console.error("Error Occured in getUsers" , error.message);
        }
    }

    @Put('/user')
    @UseGuards(AdminJwtAuthGuard)
    async editUserRole(
        @Param('userId') userId: string,
        @Body(new ValidationPipe()) body: UpdateRoleDto,
        @Req() req: Request,
        @Res() res: Response) {
        try {
            console.log("body");
            const user =await this.userService.findUserByUserId(userId);
            if(!user){
                this.responseService.sendNotFount(res, "User Not Found");
            }
            const updatedUser = await this.adminService.updateUserRole(body.role ,body.userId); 
            this.responseService.sendSuccessResponse(res, { data: updatedUser }, "User Updated Successfully");
        } catch (error) {
            console.error("Error Occured in getUsers" , error.message);
            this.responseService.sendBadRequest(res,error.message);
        }
    }
}
