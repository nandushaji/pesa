import { Body, Controller, Get, Inject, Param, Post, Put } from "@nestjs/common";
import { CATEGORICAL_MILESTONE_SERVICE, MILESTONE_SERVICE } from "../Constants";
import { CreateCategoricalMilestoneInput } from "../dto/CreateCategoricalMilestoneInput";
import { CreateMilestoneInput } from "../dto/CreateMilestoneInput";
import { EditCategoricalMilestoneInput } from "../dto/EditCategoricalMilestoneInput";
import { EditMilestoneInput } from "../dto/EditMilestoneInput";
import { ICategoricalMilestoneService } from "../services/ICategoricalMilestoneService";
import { IMilestoneService } from "../services/IMilestoneService";

@Controller("/api/v1/milestone")
export class MilestoneController {

    constructor(
        @Inject(MILESTONE_SERVICE)
        private readonly milestoneService: IMilestoneService,
        @Inject(CATEGORICAL_MILESTONE_SERVICE)
        private readonly categoricalMilestoneService: ICategoricalMilestoneService
    ) {}

    @Post("/")
    async createMilestone(
        @Body() createMilestoneInput: CreateMilestoneInput,
    ){
        const result = await this.milestoneService.createMilestone(createMilestoneInput);
        return result;
    }

    @Get("current-milestone/:userId")
    async getCurrentMilestone(
        @Param("userId") userId: string
    ) {
        const result = await this.milestoneService.getCurrentMilestone(userId);
        return result;
    }

    @Put("/:id")
    async editMilestone(
        @Param("id") id: string,
        @Body() editMilestoneInput: EditMilestoneInput
    ) {
        const result = await this.milestoneService.editMilestone(id, editMilestoneInput);
        return result;
    }

    @Post("/categorical-milestone")
    async createCategoricalMilestone(
        @Body() createMilestoneCategoricalInput: CreateCategoricalMilestoneInput,
    ){
        const result = await this.categoricalMilestoneService.createCategoricalMilestone(createMilestoneCategoricalInput);
        return result;
    }

    @Put("/categorical-milestone/:id")
    async editCategoricalMilestone(
        @Param("id") id: string,
        @Body() editCategoricalMilestoneInput: EditCategoricalMilestoneInput
    ) {
        const result = await this.categoricalMilestoneService.editCategoricalMilestone(id, editCategoricalMilestoneInput);
        return result;
    }

    @Get("categorical-milestone/:id")
    async getCategoricalMilestoneById(
        @Param("id") id: string,
    ) {
        const result = await this.categoricalMilestoneService.getCategoricalMilestoneById(id);
        return result;
    }

    @Get("categorical-milestone/milestone/:id")
    async getCategoricalMilestoneByMilestoneId(
        @Param("id") id: string,
    ) {
        const result = await this.categoricalMilestoneService.getCategoricalMilestoneByMilestoneId(id);
        return result;       
    }

}