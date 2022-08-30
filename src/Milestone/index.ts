import { Module, Provider } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "../User";
import { CommonModule } from "../Common";
import { CATEGORICAL_MILESTONE_SERVICE, MILESTONE_SERVICE } from "./Constants";
import { MilestoneController } from "./controllers/MilestoneController";
import { Milestone } from "./entities/Milestone";
import { MilestoneRepository } from "./repository/MilestoneRepository";
import { MilestoneService } from "./services/MilestoneService";
import { CategoricalMilestoneService } from "./services/CategoricalMilestoneService";
import { CategoricalMilestone } from "./entities/CategoricalMilestone";
import { CategoricalMilestoneRepository } from "./repository/CategoricalMilestoneRepository";

const milestoneServiceProvider: Provider = {
    provide: MILESTONE_SERVICE,
    useClass: MilestoneService
};

const categoricalMilestoneServiceProvider: Provider = {
    provide: CATEGORICAL_MILESTONE_SERVICE,
    useClass: CategoricalMilestoneService
};

@Module({
    imports: [
        CommonModule,
        TypeOrmModule.forFeature([Milestone, MilestoneRepository]),
        TypeOrmModule.forFeature([CategoricalMilestone, CategoricalMilestoneRepository]),
        UserModule
    ],
    exports: [],
    providers: [milestoneServiceProvider, categoricalMilestoneServiceProvider],
    controllers: [MilestoneController]
})
export class MilestoneModule {}