import { PrismaClient } from "@prisma/client";

export default function () {

}

const connection = () => {
    const dbConnection =  new PrismaClient()
    dbConnection.$connect()
}

module.exports = new PrismaClient().$connect()
