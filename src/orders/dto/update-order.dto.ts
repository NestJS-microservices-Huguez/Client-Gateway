import { OrderStatus, OrderStatusList } from '../enum/order.enum';
import { IsEnum } from 'class-validator';

export class UpdateOrderDto {

  @IsEnum(OrderStatusList, {
    message: `Possible status values are ${OrderStatusList.toString()}`
  })
  status: OrderStatus;
}
