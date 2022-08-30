import { EntityRepository, Repository } from "typeorm";
import { UserTransaction } from "../entities/UserTransaction";

@EntityRepository(UserTransaction)
export class UserTransactionRepository extends Repository<UserTransaction> {
}