import { IsEnum, IsInt, IsOptional, Matches, Min } from "class-validator";
import { UUID_REGEX } from "../../Common/Constants";
import { MilestoneStatus } from "../enums/MilestoneStatus";
import { MilestoneType } from "../enums/MilestoneType";

export class CreateMilestoneInput {
    @Matches(RegExp(UUID_REGEX))
    userId: string;

    @Min(0)
    amount: number;

    @IsEnum(MilestoneStatus)
    @IsOptional()
    status: MilestoneStatus

    @IsEnum(MilestoneType)
    @IsOptional()
    type: MilestoneType
}