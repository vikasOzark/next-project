import { PrismaClient } from "@prisma/client";

let prismaInstance;

if (process.env.NODE_ENV === 'production') {
    // Connect to the database in production
    prismaInstance = new PrismaClient();
} else {
    // Use a development-specific database (optional)
    if (!global.prismaInstance) {
        global.prismaInstance = new PrismaClient();
    }
    prismaInstance = global.prismaInstance;
}

export default prismaInstance;

