import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PaginationDTO } from 'src/common/dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { NATS_SERVICES } from 'src/config/services';

@Controller('products')
export class ProductsController {

   constructor(
      @Inject(NATS_SERVICES)
      private readonly client: ClientProxy,
   ) { }

   @Post()
   create(@Body() body: CreateProductDto) {
      return this.client.send({ cmd: 'create_product' }, { ...body }).pipe(catchError(err => { throw new RpcException(err) }));
   }

   @Get(":id")
   getProduct(@Param("id", ParseIntPipe) id: number) {
      return this.client.send({ cmd: "get_product_by_id" }, { id }).pipe(catchError(err => { throw new RpcException(err) }));
   }

   @Get()
   getProducts(@Query() pagination: PaginationDTO) {
      return this.client.send({ cmd: 'get_all_product' }, { ...pagination }).pipe(catchError(err => { throw new RpcException(err) }));
   }

   @Delete(":id")
   deleteProduct(@Param("id", ParseIntPipe) id: number) {
      return this.client.send({ cmd: 'delete_product' }, { id }).pipe(catchError(err => { throw new RpcException(err) }));
   }

   @Put(":id")
   updateProduct(@Param("id", ParseIntPipe) id: number, @Body() body: UpdateProductDto) {
      return this.client.send({ cmd: 'update_product' }, { id, ...body }).pipe(catchError(err => { throw new RpcException(err) }));
   }
}
