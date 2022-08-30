import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { UserModule } from './User';
import { UserController } from './User/controller/UserController';
import { DatabaseModule } from './Db';
import { MilestoneModule } from './Milestone';
import { TransactionModule } from './Transaction';
import { TransactionController } from './Transaction/controller/TransactionController';

@Module({
  imports: [UserModule, DatabaseModule, MilestoneModule, TransactionModule],
  controllers: [UserController,HealthController, TransactionController],
  providers: [],
})
export class AppModule {}
