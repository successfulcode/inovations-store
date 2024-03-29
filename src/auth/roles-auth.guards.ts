import { JwtService } from '@nestjs/jwt';
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles-auth.decorator';

@Injectable()
export class RolesAuthGuards implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    try {
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(
        ROLES_KEY,
        [
          context.getHandler(),
          context.getClass()
        ]
      );

      if (!requiredRoles) {
        return true;
      }

      const authHeader = req.headers.authorization;

      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException('The user not authorized');
      }

      const user = this.jwtService.verify(token);
      req.user = user;
      return user.roles.some((role: { userRole: string; }) => requiredRoles.includes(role.userRole));
    } catch (error) {
      console.log(error);
      throw new HttpException('Access Denied', HttpStatus.FORBIDDEN);
    }
  }
}