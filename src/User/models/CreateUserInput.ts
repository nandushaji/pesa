import { IsInt, IsPhoneNumber, MIN } from "class-validator";

export class CreateUserInput {
    @IsPhoneNumber()
    phoneNumber: string;

    name:string;

    @IsInt()
    income:number;
}