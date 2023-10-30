import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const requestBody = await request.json()
        console.log(requestBody);

        return NextResponse.json({
        success : true,
        message: "You signed up successfully.",
        data: user,
      });
        
    } catch (error) {
        log
        return NextResponse.json({
        success : true,
        message: "You signed up successfully.",
        data: user,
      });
    }
}