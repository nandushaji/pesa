import { Controller, Module, Provider } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommonModule } from "../Common";
import { TRANSACTION_SERVICE, USER_TRANSACTION_SERVICE } from "./Constant";
import { TransactionController } from "./controller/TransactionController";
import { Transaction } from "./entities/Transaction";
import { UserTransaction } from "./entities/UserTransaction";
import { TransactionRepository } from "./repository/TransactionRepository";
import { UserTransactionRepository } from "./repository/UserTransactionRepository";
import { TransactionService } from "./service/TransactionService";
import { UserTransactionService } from "./service/UserTransactionService";

const transactionServiceProvider: Provider = {
  provide: TRANSACTION_SERVICE,
  useClass: TransactionService,
};

const userTransactionServiceProvider: Provider = {
  provide: USER_TRANSACTION_SERVICE,
  useClass: UserTransactionService,
};


@Module({
  imports: [CommonModule, TypeOrmModule.forFeature([Transaction, TransactionRepository]), TypeOrmModule.forFeature([UserTransaction, UserTransactionRepository])],
  providers: [transactionServiceProvider, userTransactionServiceProvider],
  controllers: [TransactionController],
  exports: [transactionServiceProvider,userTransactionServiceProvider]
})
export class TransactionModule { }

