import { AbstractEntity } from "../../Common/AbstractEntity";
import { Category } from "../../Common/enums/Category";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Milestone } from "./Milestone";
import { v4 } from "uuid";

@Entity()
export class CategoricalMilestone extends AbstractEntity {

    @Column()
    @PrimaryGeneratedColumn("uuid")
    id: string = v4();
    
    @Column({nullable: true, default: Category.OTHERS})
    category: Category

    @ManyToOne((type) => Milestone)
    @JoinColumn({ referencedColumnName: "id", name: "milestone_id" })
    milestone: Milestone;

    @Column({nullable: false, type: "uuid"})
    milestoneId: string;

    @Column("decimal", {
        scale: 2,
        precision: 13,
        nullable: true,
      })
    amount: number;
}