"use server"
import prismaInstance from "@/lib/dbController";
import { ErrorResponse } from "@/utils/ErrorResponseHandler";
import SuccessResponseHandler from "@/utils/SuccessResponseHandler";
import { INTERGRATION_PROVIDER, PrismaClient } from "@prisma/client";
export default async function gitlabIntegrate(formData) {
    try {

        const data = fetch("http://gitlab.com/glpat-e-yQzxtHooqz-2b3p7Hw")
        const res = await data.json()
        console.log(res);
        // /**
        //  * @type {PrismaClient}
        //  */
        // const prisma = prismaInstance
        // const body = await request.json()

        // prisma.integrations.create({
        //     data: {
        //         providerName: INTERGRATION_PROVIDER.GITLAB,

        //     }
        // })
        return { message: "success" }
    } catch (error) {
        return ErrorResponse({ error })
    }
}
