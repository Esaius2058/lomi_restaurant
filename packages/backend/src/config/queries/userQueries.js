import prisma from "../utils/prisma/prisma";
const bcrypt = require('bcryptjs')


export async function handleCreateUser(email, name, password, role) {
    const user = await prisma.user.create({
        data: {
            email,
            name,
            password,
            role,
        },
    });
    return user;
}

export async function handleUpdateUser(id, name, email, password){
    const user = await prisma.user.update({
        where: {
            id,
        },
        data: {
            email,
            name,
            password,
        },
    });
    return user;
}

export async function handleDeleteUser(id){
    const user = await prisma.user.delete({
        where: {
            id,
        },
    });
    return user;
}

export async function handleGetUser(id){
    const user = await prisma.user.findUnique({
        where: {
            id,
        },
    });
    return user;
}

export async function handleGetAllUsers(){
    const users = await prisma.user.findMany();
    return users;
}