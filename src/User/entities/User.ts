import { AbstractEntity } from "../../Common/AbstractEntity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 } from "uuid";

@Entity()
export class User extends AbstractEntity {
  @Column()
  @PrimaryGeneratedColumn("uuid")
  id: string = v4();

  @Column()
  phoneNumber: string;

  @Column({nullable:true})
  name:string;

  @Column({nullable:true})
  income:string
}
