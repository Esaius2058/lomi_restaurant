import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;

const prisma = globalForPrisma.prisma || new PrismaClient(); //  In production, it ensures only one instance is used.

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma; // In development, it prevents new PrismaClient() from being created every time you save changes.

export default prisma;