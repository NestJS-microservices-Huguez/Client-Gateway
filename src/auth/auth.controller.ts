import { Controller, Post, Inject, Body } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NATS_SERVICES } from 'src/config/services';
import { LoginDTO, SignUpDTO } from './dto';


@Controller('auth')
export class AuthController {

  constructor(
    @Inject(NATS_SERVICES)
    private readonly client: ClientProxy
  ) { }

  @Post("login")
  login( @Body() loginDTO: LoginDTO ) {
    return this.client.send("login", loginDTO );
  }

  @Post("singUp")
  signUp( @Body() signUpDTO: SignUpDTO ) {
    return this.client.send("signUp", signUpDTO )
  }

  @Post("verifyToken")
  verifyToken() {
    return this.client.send("verifyToken", {})
  }
}
