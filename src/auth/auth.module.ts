import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { TransportsModule } from 'src/transports/transports.module';

@Module({
  controllers: [AuthController],
  providers: [],
  imports: [TransportsModule]
})
export class AuthModule {}
