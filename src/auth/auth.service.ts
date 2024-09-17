import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '@/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { createHmac } from 'crypto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private jwtService: JwtService) { }

  validateToken(token: string) {
    return this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET
    });
  }

  async login({ username, password }: LoginDto) {
    const user = await this.userService.findUser(username);

    if (!user) {
      throw new UnauthorizedException('user or password invalid');
    }

    const isPasswordEqual = user.password === createHmac('sha256', password).digest('hex');

    if (!isPasswordEqual) {
      throw new UnauthorizedException('user or password invalid');
    }

    return {
      access_token: this.jwtService.sign({
        name: user.name,
        username: user.username
      }),
    };
  }
}