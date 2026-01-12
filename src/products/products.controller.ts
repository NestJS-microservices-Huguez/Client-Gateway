import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PaginationDTO } from 'src/common/dto';
import { PRODUCT_SERVICE } from 'src/config';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {

   constructor(
      @Inject( PRODUCT_SERVICE )
      private readonly productClient: ClientProxy,
   ) { }

   @Post()
   create( @Body() body: CreateProductDto ) {
      return this.productClient.send( { cmd: 'create_product' }, { ...body } ).pipe( catchError(err => { throw new RpcException(err)}));
   }

   @Get(":id")
   getProduct(@Param("id", ParseIntPipe) id: number) {
      return this.productClient.send( { cmd: "get_product_by_id" }, { id } ).pipe( catchError(err => { throw new RpcException(err)}));
   }

   @Get()
   getProducts(@Query() pagination: PaginationDTO ) {
      return this.productClient.send( { cmd: 'get_all_product' }, { ...pagination } ).pipe( catchError(err => { throw new RpcException(err)}));
   }

   @Delete(":id")
   deleteProduct(@Param("id", ParseIntPipe) id: number) {
      return this.productClient.send( { cmd: 'delete_product' }, { id } ).pipe( catchError(err => { throw new RpcException(err)}));
   }

   @Put(":id")
   updateProduct(@Param("id", ParseIntPipe) id: number, @Body() body: UpdateProductDto) {
      return this.productClient.send( { cmd: 'update_product' }, { id, ...body } ).pipe( catchError(err => { throw new RpcException(err)}));
   }
}
