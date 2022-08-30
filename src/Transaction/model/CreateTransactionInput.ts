import { Optional } from "@nestjs/common";
import { IsEnum, IsInt,  IsNotEmpty,  IsOptional,  Matches,  MaxLength,  Min,  MIN } from "class-validator";
import { Category } from "../../Common/enums/Category";
import { UUID_REGEX } from "../../Common/Constants";
import { UserShare } from "../dto/UserShare";
import { ShareType } from "../enums/ShareType";
import { TransactionStatus } from "../enums/TransactionStatus";

export class CreateTransactionInput {

    @IsNotEmpty()
    @MaxLength(255)
    title : String

    @IsEnum(Category)
    categoryId: string;

    userShares: UserShare[]

    @Matches(RegExp(UUID_REGEX))
    @Optional()
    categoricalMilestoneId: string;

    @Matches(RegExp(UUID_REGEX))
    @IsNotEmpty()
    milestoneId: string;

    @IsEnum(ShareType)
    shareType: ShareType

    @Min(0)
    amount: number

    @IsEnum(TransactionStatus)
    @Optional()
    transactionStatus : TransactionStatus

    @Matches(RegExp(UUID_REGEX))
    @IsNotEmpty()
    paidBy : string
}