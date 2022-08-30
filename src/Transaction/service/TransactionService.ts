import { Inject, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TransactionRepository } from "../repository/TransactionRepository";
import { Transaction } from "../entities/Transaction";
import { ITransactionService } from "./ITransactionService";
import { CreateTransactionInput } from "../model/CreateTransactionInput";
import { plainToClass } from "class-transformer";
import { UpdateTransactionInput } from "../model/UpdateTransactionInput";
import { USER_TRANSACTION_SERVICE } from "../Constant";
import { IUserTransactionService } from "./IUserTransactionService";

export class TransactionService implements ITransactionService {
    private readonly logger: Logger = new Logger(TransactionService.name);
    constructor(@InjectRepository(Transaction)
    private transactionRepository: TransactionRepository,
    @Inject(USER_TRANSACTION_SERVICE)
    private userTransactionService:IUserTransactionService
    ) { }

    async editTransaction(id : string, updateTransactionInput : UpdateTransactionInput): Promise<Transaction> {
        const transaction = await this.transactionRepository.findOneBy({ id });
        if(!transaction){
            throw new NotFoundException("Transaction not found")
        }
        const updatedTransaction =  plainToClass(Transaction, {
            ...transaction,
            ...updateTransactionInput
        });
        const newTransaction = await this.transactionRepository.save(updatedTransaction);
        await this.userTransactionService.addUserTransaction({
            shareType:updateTransactionInput.shareType,
            transactionId:transaction.id,
            userShares:updateTransactionInput.userShares
        });
        return newTransaction;
    }
    getAllTransactionsByUserId(userId : string): Promise<Transaction[]> {
        return null;
    }

    getTransactionById(id : string): Promise<Transaction> {
        return this.transactionRepository.findOne({
            where : {id}
        });
    }

    getTransactionsByMilestoneId(milestoneId : string) : Promise<Transaction[]> {
        return this.transactionRepository.find({
            where : {milestoneId}
        });
    }

    async createTransaction(createTransactionInput: CreateTransactionInput): Promise<Transaction> {
        const transaction = plainToClass(Transaction, {
            ...createTransactionInput
        });
        const newTransaction = await  this.transactionRepository.save(transaction);
        await this.userTransactionService.addUserTransaction({
            shareType:createTransactionInput.shareType,
            transactionId:transaction.id,
            userShares:createTransactionInput.userShares
        });
        return newTransaction;
    }
}