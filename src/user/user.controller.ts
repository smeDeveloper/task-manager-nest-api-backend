import { Body, Controller, Post } from "@nestjs/common";
import { UserDTO } from "src/DTOs/user.dto";
import { UserService } from "./user.service";
import { SignInDTO } from "src/DTOs/signIn.dto";

@Controller("api/user")
export class UserController {
    constructor (private readonly userService:UserService) {}
    @Post("sign-up")
    signUp(@Body() data: UserDTO,): Promise<UserDTO | object> {
        return this.userService.signUp(data);
    }

    @Post("sign-in")
    signIn(@Body() data:SignInDTO):Promise<UserDTO | object> {
        return this.userService.signIn(data);
    }
}