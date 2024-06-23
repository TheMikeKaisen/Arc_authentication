import {PrismaClient} from '@prisma/client' //main class used to interact with database through prisma

// declaring prisma variable in global scope. Global scope does'nt get affected by hot-reloading
declare global {
    var prisma: PrismaClient | undefined
}

//checks if prisma variable is defined or not in global variable. if not, then it creates a new prisma client instance
export const db = globalThis.prisma || new PrismaClient();


// only one instance of prisma client is made in development mode because otherwise many instances of prisma are made in each hot-reloading
if(process.env.NODE_ENV !== "production") globalThis.prisma = db


// Why this approach?

//This pattern is often used to ensure that there is only a single instance of PrismaClient during development. In development environments, modules can be hot-reloaded, leading to multiple instances of PrismaClient being created if the file is re-imported. This can cause problems because each instance maintains its own connection pool, potentially overwhelming the database with too many connections. By storing the instance globally, you ensure that the same instance is reused across hot-reloads.