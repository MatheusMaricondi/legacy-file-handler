import prisma from "../services/prisma.service";
import IClient from "../types/client";

class User {
    createUser(users: IClient[]) {
        users.map(post => {

        })
        // prisma.user.create()
    }
}

export default User