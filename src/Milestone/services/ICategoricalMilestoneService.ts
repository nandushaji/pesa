import { CreateCategoricalMilestoneInput } from "../dto/CreateCategoricalMilestoneInput";
import { EditCategoricalMilestoneInput } from "../dto/EditCategoricalMilestoneInput";
import { CategoricalMilestone } from "../entities/CategoricalMilestone";

export interface ICategoricalMilestoneService {
    createCategoricalMilestone(createMilestoneCategoricalInput: CreateCategoricalMilestoneInput): Promise<CategoricalMilestone>;

    editCategoricalMilestone(id: string, editCategoricalMilestoneInput: EditCategoricalMilestoneInput): Promise<CategoricalMilestone>;

    getCategoricalMilestoneById(id: string): Promise<CategoricalMilestone>;

    getCategoricalMilestoneByMilestoneId(milestoneId: string): Promise<CategoricalMilestone[]>; 
}