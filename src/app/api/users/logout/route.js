import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export default async function GET (request) {
    try {
        const response = await fetch("http://127.0.0.1:8000/v1/api/auth/logout/", {
            method: "DELETE"
        })
        
        const responseData = await response.jaon()
        if (responseData.success) {
            cookies().delete("token")
            cookies().delete("email")
            cookies().delete("username")
            cookies().delete("first_name")
            cookies().delete("is_superuser")
            cookies().delete("is_staff")
            return NextResponse.json(responseData, {status: responseData.status})
        } else {
            return NextResponse.json(responseData, {status: responseData.status})
        }
    } catch {
        return NextResponse.json({
            message: "Somethine went wrong, please try again.",
            success: false,
            data: {}
        }, {status: responseData.status})
    }
}