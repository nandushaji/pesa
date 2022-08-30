import { NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToClass } from "class-transformer";
import { CreateMilestoneInput } from "../dto/CreateMilestoneInput";
import { EditMilestoneInput } from "../dto/EditMilestoneInput";
import { Milestone } from "../entities/Milestone";
import { MilestoneStatus } from "../enums/MilestoneStatus";
import { MilestoneRepository } from "../repository/MilestoneRepository";
import { IMilestoneService } from "./IMilestoneService";

export class MilestoneService implements IMilestoneService{

    constructor(
        @InjectRepository(Milestone)
        private readonly milestoneRepository: MilestoneRepository,
        
    ) {}

    async createMilestone(createMilestoneInput: CreateMilestoneInput) {
        const milestone = plainToClass(Milestone, {
            ...createMilestoneInput
        });

        return this.milestoneRepository.save(milestone);
    }

    async getCurrentMilestone(userId: string) {
        return this.milestoneRepository.findOne({
            where: {
                userId,
                status: MilestoneStatus.CURRENT
            }
        });
    }

    async editMilestone(id: string, editMilestoneInput: EditMilestoneInput) {
        const milestone = await this.milestoneRepository.findOne({
            where: {
                id,
                status: MilestoneStatus.CURRENT
             }});

        if (!milestone) {
            throw new NotFoundException("Milestone not found");
        }

        const updatedMilestone = plainToClass(Milestone, {
            ...milestone,
            ...editMilestoneInput
        });

        await this.milestoneRepository.update({id}, updatedMilestone);

        return updatedMilestone;
    }

    async getMilestoneById(milestoneId: string) {
        return this.milestoneRepository.findOneById(milestoneId);
    }

}