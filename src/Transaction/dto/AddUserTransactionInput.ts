import { IsEnum, Matches } from "class-validator";
import { UUID_REGEX } from "src/Common/Constants";
import { ShareType } from "../enums/ShareType";
import { UserShare } from "./UserShare";

export class AddUserTransactionInput{
    @Matches(RegExp(UUID_REGEX))
    transactionId:string

    @IsEnum(ShareType)
    shareType:ShareType;

    userShares:UserShare[];
}