import { AbstractEntity } from "../../Common/AbstractEntity";
import { User } from "../..//User/entities/User";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 } from "uuid";
import { MilestoneStatus } from "../enums/MilestoneStatus";
import { MilestoneType } from "../enums/MilestoneType";

@Entity()
export class Milestone extends AbstractEntity {

    @Column()
    @PrimaryGeneratedColumn("uuid")
    id: string = v4();
    
    @ManyToOne((type) => User)
    @JoinColumn({ referencedColumnName: "id", name: "user_id" })
    user: User;

    @Column({nullable: false, type: "uuid"})
    userId: string;

    @Column("decimal", {
        scale: 2,
        precision: 13,
        nullable: true,
      })
    amount: number;

    @Column({default: MilestoneStatus.CURRENT})
    status: MilestoneStatus;

    @Column({default: MilestoneType.MONTHLY})
    type: MilestoneType;
}