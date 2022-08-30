import { IsEnum, Matches, Min } from "class-validator";
import { UUID_REGEX } from "src/Common/Constants";
import { ShareType } from "../enums/ShareType";

export class UserShare{
    @Matches(RegExp(UUID_REGEX))
    userId:string

    @Min(0)
    amount:number;
}