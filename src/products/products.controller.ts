import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';

@Controller('products')
export class ProductsController {

   constructor() { }

   @Post()
   create( @Body() body: any ) {
      return body
   }

   @Get(":id")
   getProduct(@Param("id", ParseIntPipe) id: number) {
      return ""+id
   }

   @Get()
   getProducts(@Query() pagination: any) {
      return []
   }

   @Delete(":id")
   deleteProduct(@Param("id", ParseIntPipe) id: number) {
      return ""+id
   }

   @Put(":id")
   updateProduct(@Param("id", ParseIntPipe) id: number, @Body() body: any) {
      return ""+id
   }
}
