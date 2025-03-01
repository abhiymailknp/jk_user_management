import { Body, Controller, Next, Post, Req, Res ,ValidationPipe} from '@nestjs/common';
import { Request, Response } from 'express';
import { SignUpDto } from './dto/signup.dto';
import { UsersService } from './users.service';
import { ResponseService } from 'src/utils/response.service';
import { Role } from 'src/constants/constants';


@Controller('users')
export class UsersController {

    constructor(
        private readonly userService: UsersService,
        private readonly responseService: ResponseService
    ){}

    @Post('/signup')
    async userSignUp(
        @Body(new ValidationPipe()) body: SignUpDto,
        @Req() req: Request,
        @Res() res: Response
    )
    {
        const existingUser = await this.userService.findUserByEmail(body.email);
        if(existingUser){
            this.responseService.sendBadRequest(res,"User Already Exist");
            return;
        }
        const user = await this.userService.userSignUp(body);
        this.responseService.sendSuccessResponse(res,{data :user} ,"User Created Successfully");
        return;
    }

    @Post('/admin/signup')
    async adminSignUp(
        @Body(new ValidationPipe()) body: SignUpDto,
        @Req() req: Request,
        @Res() res: Response
    )
    {
        const existingUser = await this.userService.findUserByEmail(body.email);
        if(existingUser){
            this.responseService.sendBadRequest(res,"User Already Exist");
            return;
        }
        body.role = Role.admin;
        const user = await this.userService.userSignUp(body);
        this.responseService.sendSuccessResponse(res,{data :user} ,"User Created Successfully");
        return;
    }
}