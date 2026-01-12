
import { Catch, ArgumentsHost } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class ExceptionFilter implements ExceptionFilter {

   catch(exception: RpcException, host: ArgumentsHost) {
      const ctx = host.switchToHttp()
      const response = ctx.getResponse()

      const errorRpc = exception.getError()

      if ( typeof errorRpc === 'object' && 'status' in errorRpc && 'message' in errorRpc ) {
         return response.status( errorRpc.status ).json({ ...errorRpc })
      }

      return response.status( 500 ).json({ error: errorRpc })
   }
}