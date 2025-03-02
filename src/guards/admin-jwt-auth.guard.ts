import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { TokenData } from 'src/interfaces/user.interface';
import { Role } from 'src/constants/constants';

@Injectable()
export class AdminJwtAuthGuard extends AuthGuard('jwt') {
  constructor(private jwtService: JwtService) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    
    if (!authHeader) {
      throw new UnauthorizedException('No token provided');
    }
    try {
      const token = authHeader.split(' ')[1];
      const tokenData = this.jwtService.verify(token);
      if (tokenData.role !== Role.admin) {
        throw new UnauthorizedException('You do not have permission to access this resource');
      }
      request.user = tokenData as TokenData
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
