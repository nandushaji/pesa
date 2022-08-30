import { Min } from "class-validator";

export class EditMilestoneInput {
    @Min(0)
    amount: number;
}