import { Controller, Get, Post, Body, Patch, Param, Inject, ParseIntPipe, ParseUUIDPipe, Query } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ORDER_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { OrderPaginationDTO } from './dto';

@Controller('orders')
export class OrdersController {

   constructor(
      @Inject(ORDER_SERVICE)
      private readonly productClient: ClientProxy
   ) { }

   @Post()
   create(@Body() createOrderDto: CreateOrderDto) {
      return this.productClient.send("createOrder", { ...createOrderDto }).pipe(catchError(err => { throw new RpcException(err) }));
   }

   @Get()
   findAll(@Query() pagination: OrderPaginationDTO ) {
      return this.productClient.send("findAllOrders", {...pagination}).pipe(catchError(err => { throw new RpcException(err) }));
   }

   @Get(':id')
   findOne(@Param('id', ParseUUIDPipe) id: string) {
      return this.productClient.send("findOneOrder", { id }).pipe(catchError(err => { throw new RpcException(err) }));
   }

   @Patch(':id')
   
   update(@Param('id', ParseUUIDPipe ) id: string, @Body() updateOrderDto: UpdateOrderDto) {
      return this.productClient.send("changeOrderStatus", { id, ...updateOrderDto }).pipe(catchError(err => { throw new RpcException(err) }));
   }

}
