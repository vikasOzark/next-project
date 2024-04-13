import { PrismaClient } from "@prisma/client";
import prismaInstance from "@/lib/dbController";

export default function () {

}

const connection = () => {
    const dbConnection = new PrismaClient()
    dbConnection.$connect()
}

module.exports = new PrismaClient().$connect()
