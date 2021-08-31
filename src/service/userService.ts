import { getRepository } from "typeorm";
import { User } from "../entity/User";

export async function saveUser(email: string, password: string) {
    const user = new User();
    user.email = email;
    user.password = password;
    return await user.save();
}

export async function login(email: string, password: string) {
    return await getRepository(User)
        .createQueryBuilder("user")
        .where("user.email = :email AND user.password = :password", { email: email, password: password })
        .getOne();
}
