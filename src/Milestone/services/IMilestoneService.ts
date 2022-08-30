import { CreateMilestoneInput } from "../dto/CreateMilestoneInput";
import { EditMilestoneInput } from "../dto/EditMilestoneInput";
import { Milestone } from "../entities/Milestone";

export interface IMilestoneService {
    createMilestone(createMilestoneInput: CreateMilestoneInput):Promise<Milestone>;

    getCurrentMilestone(userId: string):Promise<Milestone>;

    editMilestone(id: string, editMilestoneInput: EditMilestoneInput):Promise<Milestone>;

    getMilestoneById(milestoneId: string);

}