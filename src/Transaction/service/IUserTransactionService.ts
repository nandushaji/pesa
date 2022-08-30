import { AddUserTransactionInput } from "../dto/AddUserTransactionInput";
import { UserTransaction } from "../entities/UserTransaction";

export interface IUserTransactionService{
    addUserTransaction(
        addUserTransactionInput:AddUserTransactionInput
    ):Promise<UserTransaction[]>

    getUserTransactionsByTransactionIds(
        transactionIds:string[]
    ):Promise<UserTransaction[]>;

    getUserTransactionById(
        id:string
    ):Promise<UserTransaction>;
}