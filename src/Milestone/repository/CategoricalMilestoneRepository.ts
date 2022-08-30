import { EntityRepository, Repository } from "typeorm";
import { CategoricalMilestone } from "../entities/CategoricalMilestone";

@EntityRepository(CategoricalMilestone)
export class CategoricalMilestoneRepository extends Repository<CategoricalMilestone> {

}