import { AbstractEntity } from "../../Common/AbstractEntity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TransactionStatus } from "../enums/TransactionStatus";
import { v4 } from "uuid";
import { User } from "../../User/entities/User";
import { Transaction } from "./Transaction";

@Entity()
export class UserTransaction extends AbstractEntity {
    @Column()
    @PrimaryGeneratedColumn("uuid")
    id: string = v4();

    @ManyToOne((type) => User)
    @JoinColumn({ referencedColumnName: "id", name: "user_id" })
    user: User;

    @Column({nullable: false, type: "uuid"})
    userId: string;

    @ManyToOne((type) => Transaction)
    @JoinColumn({ referencedColumnName: "id", name: "transaction_id" })
    transaction: Transaction;

    @Column({nullable: false, type: "uuid"})
    transactionId: string;

    @Column()
    amount: number

    @Column()
    transactionStatus : TransactionStatus
}