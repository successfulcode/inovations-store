import { JwtService } from '@nestjs/jwt';
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuards implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    try {
      const authHeader = req.headers.authorization;

      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      console.log('bearer', bearer)

      console.log('token', token)
      

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException('The user not authorized11');
      }

      const user = this.jwtService.verify(token);
      req.user = user;
      return true;

    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('The user not authorized222');
    }
  }
}