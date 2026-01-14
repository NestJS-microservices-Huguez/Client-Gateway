import { Controller, Get, Post, Body, Patch, Param, Inject, ParseUUIDPipe, Query } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { OrderPaginationDTO } from './dto';
import { NATS_SERVICES } from 'src/config/services';

@Controller('orders')
export class OrdersController {

   constructor(
      @Inject(NATS_SERVICES)
      private readonly client: ClientProxy
   ) { }

   @Post()
   create(@Body() createOrderDto: CreateOrderDto) {
      return this.client.send("createOrder", { ...createOrderDto }).pipe(catchError(err => { throw new RpcException(err) }));
   }

   @Get()
   findAll(@Query() pagination: OrderPaginationDTO) {
      return this.client.send("findAllOrders", { ...pagination }).pipe(catchError(err => { throw new RpcException(err) }));
   }

   @Get(':id')
   findOne(@Param('id', ParseUUIDPipe) id: string) {
      return this.client.send("findOneOrder", { id }).pipe(catchError(err => { throw new RpcException(err) }));
   }

   @Patch(':id')
   update(@Param('id', ParseUUIDPipe) id: string, @Body() updateOrderDto: UpdateOrderDto) {
      return this.client.send("changeOrderStatus", { id, ...updateOrderDto }).pipe(catchError(err => { throw new RpcException(err) }));
   }

}
