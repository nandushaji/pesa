import { Min } from "class-validator";

export class EditCategoricalMilestoneInput {

    @Min(0)
    amount: number;
}