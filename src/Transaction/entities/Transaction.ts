import { AbstractEntity } from "../../Common/AbstractEntity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 } from "uuid";
import { ShareType } from "../enums/ShareType";
import { TransactionStatus } from "../enums/TransactionStatus";
import { Milestone } from "../../Milestone/entities/Milestone";
import { Category } from "../../Common/enums/Category";
import { CategoricalMilestone } from "../../Milestone/entities/CategoricalMilestone";
import { User } from "../../User/entities/User";


@Entity()
export class Transaction extends AbstractEntity {
    @Column()
    @PrimaryGeneratedColumn("uuid")
    id: string = v4();

    @Column({nullable : false})
    title : String

    @Column({nullable: true, default: Category.OTHERS})
    category: Category

    @Column({nullable: true, type: "uuid"})
    categoricalMilestoneId: string;

    @Column({nullable: false, type: "uuid"})
    milestoneId: string;

    @Column({
        default:ShareType.EQUALLY
    })
    shareType: ShareType

    @Column("decimal", {
        scale: 2,
        precision: 13,
        nullable: true,
      })
    amount: number

    @Column({
        default:TransactionStatus.NOT_SETTLED
    })
    transactionStatus : TransactionStatus

    @Column({nullable: false, type: "uuid"})
    paidBy : string

    @ManyToOne((type) => Milestone)
    @JoinColumn({ referencedColumnName: "id", name: "milestone_id" })
    milestone: Milestone;

    @ManyToOne((type) => CategoricalMilestone)
    @JoinColumn({ referencedColumnName: "id", name: "categorical_milestone_id" })
    categoricalMilestone: CategoricalMilestone;

    @ManyToOne((type) => User)
    @JoinColumn({ referencedColumnName: "id", name: "paid_by" })
    paidUser: User;



}
