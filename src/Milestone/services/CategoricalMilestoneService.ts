import { BadRequestException, Inject, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToClass } from "class-transformer";
import { MILESTONE_SERVICE } from "../Constants";
import { CreateCategoricalMilestoneInput } from "../dto/CreateCategoricalMilestoneInput";
import { EditCategoricalMilestoneInput } from "../dto/EditCategoricalMilestoneInput";
import { CategoricalMilestone } from "../entities/CategoricalMilestone";
import { CategoricalMilestoneRepository } from "../repository/CategoricalMilestoneRepository";
import { ICategoricalMilestoneService } from "./ICategoricalMilestoneService";
import { IMilestoneService } from "./IMilestoneService";

export class CategoricalMilestoneService implements ICategoricalMilestoneService {
    constructor(
        @InjectRepository(CategoricalMilestone)
        private readonly categoricalMilestoneRepository: CategoricalMilestoneRepository,
        @Inject(MILESTONE_SERVICE)
        private readonly milestoneService: IMilestoneService
    ) {}

    async createCategoricalMilestone(createMilestoneCategoricalInput: CreateCategoricalMilestoneInput) {

        await this.checkIfMilestoneAmountExceeded(createMilestoneCategoricalInput.amount, createMilestoneCategoricalInput.milestoneId);
        
        const categoricalMilestone = plainToClass(CategoricalMilestone, {
            ...createMilestoneCategoricalInput
        });

        return this.categoricalMilestoneRepository.save(categoricalMilestone);
    }

    async editCategoricalMilestone(id: string, editCategoricalMilestoneInput: EditCategoricalMilestoneInput) {
        
        const categoricalMilestone =  await this.categoricalMilestoneRepository.findOneById(id);

        await this.checkIfMilestoneAmountExceeded(editCategoricalMilestoneInput.amount, categoricalMilestone.milestoneId, categoricalMilestone.id);

        if (!categoricalMilestone) {
            throw new NotFoundException("Milestone not found");
        }
        const updatedMilestone = plainToClass(CategoricalMilestone, {
            ...categoricalMilestone,
            ...editCategoricalMilestoneInput
        })

        await this.categoricalMilestoneRepository.update({id}, updatedMilestone);

        return updatedMilestone;
    }


    async getCategoricalMilestoneById(id: string): Promise<CategoricalMilestone> {
        return this.categoricalMilestoneRepository.findOne({where: {id}});
    }

    async getCategoricalMilestoneByMilestoneId(milestoneId: string): Promise<CategoricalMilestone[]> {
        return this.categoricalMilestoneRepository.find({where: {milestoneId}})
    }
    
    private async checkIfMilestoneAmountExceeded(categoryAmount: number, milestoneId: string, editCategoricalMilestoneId?: string): Promise<boolean> {
        const milestone = await this.milestoneService.getMilestoneById(milestoneId);

        const categoricalMilestones = await this.getCategoricalMilestoneByMilestoneId(milestoneId);

        const totalCategoricalBudgetAmount = categoricalMilestones
            .reduce((prevValue, categoricalMilestone) => {
                if (editCategoricalMilestoneId && editCategoricalMilestoneId === categoricalMilestone.id) {
                    return prevValue;
                }
                return Number(categoricalMilestone.amount) + Number(prevValue);
            }, categoryAmount);

        if (totalCategoricalBudgetAmount > milestone.amount) {
            throw new BadRequestException("Categorical milestone amount greater than total milestone amount!");
        }

        return true;
    }

}