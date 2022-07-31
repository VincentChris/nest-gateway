import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { FastifyRequest } from 'fastify';
import { Strategy } from 'passport-local';
import { map } from 'rxjs';

@Injectable()
export class FeishuStrategy extends PassportStrategy(Strategy, 'feishu') {
  constructor(private authService: AuthService) {
    super();
  }

  validate(req: FastifyRequest) {
    const { code } = req.query as { code: string };

    return this.authService.validateFeishuUser(code).pipe(
      map((user) => {
        if (!user) {
          throw new UnauthorizedException();
        }
        return user;
      })
    );
  }
}
