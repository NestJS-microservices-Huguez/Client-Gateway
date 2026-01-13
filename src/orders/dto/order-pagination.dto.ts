import { IsEnum, IsOptional } from "class-validator";
import { OrderStatus, OrderStatusList } from "../enum/order.enum";
import { PaginationDTO } from "src/common/dto";

export class OrderPaginationDTO extends PaginationDTO {

   @IsEnum( OrderStatusList, {
      message: `Possible status values are ${ OrderStatusList.toString() }`
   } )
   @IsOptional()
   public status?: OrderStatus;
}