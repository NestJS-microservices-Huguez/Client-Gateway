import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { TransportsModule } from 'src/transports/transports.module';

@Module({
  controllers: [OrdersController],
  providers: [],
  imports: [ TransportsModule ]
})
export class OrdersModule { }
