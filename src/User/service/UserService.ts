import { BadRequestException, ConflictException, Inject, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/User";
import { CreateUserInput } from "../models/CreateUserInput";
import { UserRepository } from "../repository/UserRepository";
import { IUserService } from "./IUserService";
import { plainToClass } from "class-transformer";
import { CATEGORICAL_MILESTONE_SERVICE, MILESTONE_SERVICE } from "../../Milestone/Constants";
import { IMilestoneService } from "../../Milestone/services/IMilestoneService";
import { TRANSACTION_SERVICE, USER_TRANSACTION_SERVICE } from "../../Transaction/Constant";
import { ITransactionService } from "../../Transaction/service/ITransactionService";
import { IUserTransactionService } from "../../Transaction/service/IUserTransactionService";
import { ICategoricalMilestoneService } from "../../Milestone/services/ICategoricalMilestoneService";
import { Category } from "../../Common/enums/Category";

export class UserService implements IUserService {
    private readonly logger: Logger = new Logger(UserService.name);
    constructor(
        @InjectRepository(User) private userRepository: UserRepository,
        @Inject(TRANSACTION_SERVICE) private transactionService: ITransactionService,
        @Inject(USER_TRANSACTION_SERVICE) private userTransactionService: IUserTransactionService,
    ) {
    }
    public async createUser(createUserInput: CreateUserInput): Promise<User> {
        const user = await this.userRepository.findOne({ where: { phoneNumber: createUserInput.phoneNumber } });
        if (user) {
            throw new ConflictException("User Exists")
        }
        const newUser = plainToClass(User, createUserInput);
        return this.userRepository.save(newUser);
    }

    public async getUserByPhoneNumber(phoneNumber: string): Promise<User> {
        return this.userRepository.findOne({ where: { phoneNumber } });
    }

    public async getUserSummary(userId: string, mileStoneId: string):Promise<{[key:string]:number}> {
        const transactions = await this.transactionService.getTransactionsByMilestoneId(mileStoneId);
        const transactionIds = transactions?.map((transaction) => transaction.id);
        const userTransactions = await this.userTransactionService.getUserTransactionsByTransactionIds(transactionIds);
        const myTransactions = userTransactions.filter((transaction) => {
            return transaction.userId === userId
        });
        let totalSpend = 0;
        myTransactions?.map((transaction) => {
            totalSpend += transaction.amount
        });
        const catagoryToTransactionMap: Map<Category, string[]> = new Map();
        const catagoryToTotalSpendMap: Map<Category, number> = new Map();
        transactions?.map((transaction) => {
            const transactionIds = catagoryToTransactionMap.get(transaction.category);
            if (transactionIds?.length) {
                catagoryToTransactionMap?.set(transaction.category, [...transactionIds, transaction.id])
            }
            catagoryToTransactionMap?.set(transaction.category, [transaction.id])
        });
        console.log(catagoryToTransactionMap)
        catagoryToTransactionMap?.forEach((value,key)=>{
            let catagorySpend = 0;
            value?.forEach((value)=>{
                userTransactions?.filter((transaction)=>{
                    if(value?.includes(transaction?.transactionId)){
                        catagorySpend+=transaction?.amount
                    }
                })
            })
            catagoryToTotalSpendMap.set(key,catagorySpend);
        })
        const result:{[key:string]:number} = {};
        result["totalSpend"] = totalSpend;
        catagoryToTotalSpendMap.forEach((value,key)=>{
            result[key]= value;
        })
        return result;
    }
}