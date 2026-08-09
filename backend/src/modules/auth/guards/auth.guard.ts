import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // In Fastify with @fastify/cookie, cookies are parsed into request.cookies
    const token = request.cookies?.access_token;

    if (!token) {
      throw new UnauthorizedException(
        'Inicia sesión para acceder a este recurso.',
      );
    }

    try {
      const secret =
        this.configService.get<string>('JWT_SECRET') ??
        'cookie_secret_fallback';
      const payload = await this.jwtService.verifyAsync(token, { secret });

      // Attach parsed user data to the request object
      request.user = payload;
    } catch {
      throw new UnauthorizedException('Sesión inválida o expirada.');
    }

    return true;
  }
}
