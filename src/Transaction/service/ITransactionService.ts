import { Transaction } from "../entities/Transaction";
import { CreateTransactionInput } from "../model/CreateTransactionInput";
import { UpdateTransactionInput } from "../model/UpdateTransactionInput";

export interface ITransactionService {
    createTransaction(createTransactionInput: CreateTransactionInput): Promise<Transaction>
    editTransaction(id : string, updateTRansactionInput : UpdateTransactionInput) : Promise<Transaction>
    getTransactionById(id : string): Promise<Transaction>
    getAllTransactionsByUserId(userId : string): Promise<Transaction[]>
    getTransactionsByMilestoneId(milestoneId : string) : Promise<Transaction[]>

}