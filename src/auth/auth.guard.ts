import { CanActivate, Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IncomingMessage } from 'http';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: IncomingMessage = context.switchToHttp().getRequest();
    const token = this.getBearerTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Please provide token');
    }

    try {
      const payload = await this.authService.validateToken(token);
      request['username'] = payload.username;
    } catch {
      throw new UnauthorizedException('token expired');
    }

    return true;
  }

  private getBearerTokenFromHeader(request: IncomingMessage): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}