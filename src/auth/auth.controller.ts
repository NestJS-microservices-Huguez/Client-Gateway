import { Controller, Post, Inject, Body, Req, UseGuards } from '@nestjs/common';
import express from "express"
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICES } from 'src/config/services';
import { LoginDTO, SignUpDTO } from './dto';
import { catchError } from 'rxjs';
import { AuthGuard } from './guards';


@Controller('auth')
export class AuthController {

  constructor(
    @Inject(NATS_SERVICES)
    private readonly client: ClientProxy
  ) { }

  @Post("login")
  login( @Body() loginDTO: LoginDTO ) {
    return this.client.send("login", loginDTO ).pipe(catchError(err => { throw new RpcException(err) }));
  }

  @Post("singUp")
  signUp( @Body() signUpDTO: SignUpDTO ) {
    return this.client.send("signUp", signUpDTO ).pipe(catchError(err => { throw new RpcException(err) }));
  }

  @UseGuards( AuthGuard )
  @Post("verifyToken")
  verifyToken( @Req()  req: express.Request ) {
    return this.client.send("verifyToken", {token: req.headers['authorization']?.split(" ")[1] }).pipe(catchError(err => { throw new RpcException(err) }));
  }
}
