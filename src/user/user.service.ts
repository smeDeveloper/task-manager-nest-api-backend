import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { Repository } from "typeorm";
import { UserDTO } from "src/DTOs/user.dto";
import * as bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { SignInDTO } from "src/DTOs/signIn.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepo: Repository<UserEntity>,
    ) {}

    async signUp(data:UserDTO):Promise<UserDTO | object> {
        const userInDB = await this.userRepo.findOne({where:{email: data.email,}});
        if (userInDB) return {msg:"Internal Server Error, try again later!"};
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(data.password , salt);
        const userData = {
            id: uuid(),
            name: data.name.trim(),
            email: data.email.trim(),
            password: hashedPassword, 
        }
        await this.userRepo.save(userData);
        return {msg: "signed up successfully", user: userData,};
    }

    async signIn(data:SignInDTO):Promise<UserDTO | object> {
        const foundUser = await this.userRepo.findOne({where: {email: data.email,},});
        if(!foundUser) return {msg: "Invalid email or password.",}
        const matchPassword = await bcrypt.compare(data.password , foundUser.password);
        if(matchPassword) return foundUser;
        return {msg: "Invalid email or password.",};
    }
}