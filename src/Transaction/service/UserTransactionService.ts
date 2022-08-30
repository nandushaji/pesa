import { ConflictException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToClass } from "class-transformer";
import { In } from "typeorm";
import { AddUserTransactionInput } from "../dto/AddUserTransactionInput";
import { UserTransaction } from "../entities/UserTransaction";
import { TransactionStatus } from "../enums/TransactionStatus";
import { UserTransactionRepository } from "../repository/UserTransactionRepository";
import { IUserTransactionService } from "./IUserTransactionService";

export class UserTransactionService implements IUserTransactionService {
    constructor(
        @InjectRepository(UserTransaction)
        private readonly userTransactionRepository: UserTransactionRepository
    ) { }
    async addUserTransaction(
        addUserTransactionInput: AddUserTransactionInput
    ): Promise<UserTransaction[]> {
        const settledTransaction = await this.userTransactionRepository.findOne({ where: { transactionId: addUserTransactionInput.transactionId, transactionStatus: TransactionStatus.SETTLED } });
        if (settledTransaction) {
            throw new ConflictException("One or more settled transaction exists for the transaction")
        }
        await this.userTransactionRepository.softDelete({ transactionId: addUserTransactionInput.transactionId });
        const userTransactions = addUserTransactionInput.userShares.map((userShare => {
            return plainToClass(UserTransaction, {
                userId: userShare.userId,
                transactionId: addUserTransactionInput.transactionId,
                amount: userShare.amount,
                transactionStatus: TransactionStatus.NOT_SETTLED
            })
        }));
        return this.userTransactionRepository.save(userTransactions);
    }

    async getUserTransactionsByTransactionIds(transactionIds: string[]): Promise<UserTransaction[]> {
        return this.userTransactionRepository.find({where:{transactionId:In(transactionIds)}});
    }

    async getUserTransactionById(id: string): Promise<UserTransaction> {
        return this.userTransactionRepository.findOneById(id)
    }
}