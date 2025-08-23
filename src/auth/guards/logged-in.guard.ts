// jwt.guard.ts
import { Injectable} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LoggedInGuard extends AuthGuard('jwt') {}


// @Injectable()
// export class LoggedInGuard implements CanActivate {
//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     const request = context.switchToHttp().getRequest();
//     const authHeader = request.headers['authorization'];
//     console.log('LoggedInGuard: authHeader', authHeader);

//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       throw new UnauthorizedException('Unauthorized');
//     }

//     const token = authHeader.split(' ')[1];

//     return token === 'VALID_TOKEN';
//   }
// }
