import { Module, Provider } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TransactionModule } from "../Transaction";
import { CommonModule } from "../Common";
import { USER_SERVICE } from "./Constant";
import { UserController } from "./controller/UserController";
import { User } from "./entities/User";
import { UserRepository } from "./repository/UserRepository";
import { UserService } from "./service/UserService";

const userServiceProvider:Provider = {
  provide: USER_SERVICE,
  useClass: UserService,
};

@Module({
  imports: [CommonModule,TypeOrmModule.forFeature([User, UserRepository]),TransactionModule],
  providers: [userServiceProvider],
  controllers: [UserController],
  exports: [userServiceProvider],
})
export class UserModule {}
