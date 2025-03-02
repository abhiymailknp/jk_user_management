import { Body, Controller, Logger, Next, Post, Req, Res ,UseGuards,ValidationPipe} from '@nestjs/common';
import { Request, Response } from 'express';
import { SignUpDto } from './dto/signup.dto';
import { UsersService } from './users.service';
import { ResponseService } from 'src/utils/response.service';
import { Role } from 'src/constants/constants';
import { AuthService } from 'src/auth/auth.service';
import { SignInDto } from './dto/signin.dto';


@Controller('users')
export class UsersController {

    constructor(
        private readonly userService: UsersService,
        private readonly responseService: ResponseService,
        private readonly authService: AuthService
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

    @Post('/signin')
    async signin(
        @Body(new ValidationPipe()) body: SignInDto,
        @Req() req: Request,
        @Res() res: Response
    )
    {
       try {
         const existingUser = await this.userService.findUserByEmail(body.email);
         if(!existingUser){
             this.responseService.sendBadRequest(res,"User Doesn't Exist");
             return;
         }
         const access_token =  await this.authService.signIn(body.email,body.password)
         this.responseService.sendSuccessResponse(res,{data :{access_token}} ,"User Signed In Successfully");
         return;
       } catch (error) {
            console.error(error.message);
            this.responseService.sendServerError(res,'Password Mismatch');
            return;
       }
    }
}