import { prisma } from ".";
import bcrypt from "bcrypt"

export const createUser = async (userData) => {

    const hasedPassword = await bcrypt.hash(userData.password, 10);

    const finalUserData = {
        ...userData,
        password: hasedPassword
    }


    return prisma.user.create({
        data: finalUserData
    })
}

export const getUserByUsername = (username) => {
    return prisma.user.findUnique({
        where: {
            username
        }
    })
}

export const getUserById = (userId) => {
    return prisma.user.findUnique({
        where: {
            id: userId
        }
    })
}