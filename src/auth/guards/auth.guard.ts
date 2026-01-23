import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {

  canActivate(context: ExecutionContext,): boolean | Promise<boolean> | Observable<boolean> {
      const request = context.switchToHttp().getRequest();
      const token = this.extractToken( request );

      if ( !token ) {
         throw new UnauthorizedException("Token not found");
      }
      
      request['token'] = token
      
      return true
   }

   private extractToken( request: Request ){
      const [ type, token ] = request.headers['authorization']?.split(" ") ?? []
      return type === 'Bearer' ?  token : undefined
   }
}

