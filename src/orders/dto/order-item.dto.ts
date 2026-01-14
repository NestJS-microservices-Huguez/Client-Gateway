import { Type } from "class-transformer";
import { IsNumber, IsPositive, Min } from "class-validator";

export class OrderItemDTO {

   @IsNumber()
   @Type( () => Number )
   @IsPositive()
   productId: number;

   @IsNumber()
   @Type( () => Number )
   @IsPositive()
   quantity: number;

   @IsNumber()
   @Type( () => Number )
   @IsPositive()
   @Min(1.00)
   prince: number;
}