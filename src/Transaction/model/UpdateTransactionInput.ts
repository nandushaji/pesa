import { IsEnum, IsInt,  IsNotEmpty,  IsOptional,  Matches,  MaxLength,  Min,  MIN } from "class-validator";
import { Category } from "../../Common/enums/Category";
import { UUID_REGEX } from "../../Common/Constants";
import { UserShare } from "../dto/UserShare";
import { ShareType } from "../enums/ShareType";
import { TransactionStatus } from "../enums/TransactionStatus";

export class UpdateTransactionInput {
   
    @MaxLength(255)
    title : string

    userShares: UserShare[]

    @Matches(RegExp(UUID_REGEX))
    categoryId: string;

    @IsEnum(Category)
    categoricalMilestoneId: string;

    @Matches(RegExp(UUID_REGEX))
    milestoneId: string;

    @IsEnum(ShareType)
    shareType: ShareType

    @Min(0)
    amount: number

    @IsEnum(TransactionStatus)
    transactionStatus : TransactionStatus

    @Matches(RegExp(UUID_REGEX))
    paidBy : string
}