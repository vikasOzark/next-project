import { NextResponse, NextRequest } from 'next/server'
const  SESSION_TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwibGFzdF9sb2dpbiI6bnVsbCwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImFkbWluIiwiZmlyc3RfbmFtZSI6ImFkbWluIHZpa2FzIiwibGFzdF9uYW1lIjpudWxsLCJwaG9uZV9udW1iZXIiOm51bGwsImlzX3N1cGVydXNlciI6dHJ1ZSwiaXNfc3RhZmYiOnRydWUsImlzX2FjdGl2ZSI6dHJ1ZX0.3aoMAfq7C_tmGF1lYwpn2NfiES5iStBXP_-KFF4YUlQ"

export async function GET(request) {
    
    try {
        const dataResponse = await fetch("http://127.0.0.1:8000/v1/api/department/",{
            headers: {
                "Authentication" :  SESSION_TOKEN
            }
        })
        const response = await dataResponse.json();
        return NextResponse.json(response, {status: response.status})

    } catch (error) {
        return NextResponse.json({
            message: "Internal server error, Please try again.",
            success: false,
            data: {}
        }, {status: 500})
    }
        
}


export async function POST(request) {
    const requestBody = await request.json()
    try {
        const dataResponse = await fetch('http://127.0.0.1:8000/v1/api/department/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Authentication" : SESSION_TOKEN
                },
                body: JSON.stringify(requestBody)
            })
            const response = await dataResponse.json()
            if (dataResponse.status === 201) {
                return NextResponse.json({
                    message: "Department saved successfull.",
                    success: true,
                    data: response
                }, {status: response.status_code})
            } else if (dataResponse.status >= 500) {
                return NextResponse.json({
                    message: "Something went wrong.",
                    success: false,
                    data: response
                }, {status: response.status_code})
            } else {
                return NextResponse.json({
                    message: "Couldn't complete the request.",
                    success: false,
                    data: response
                }, {status: response.status_code})
            }
    } catch (error) {
        return NextResponse.json({
            message: "Something went wrong.",
            success: false,
            data: {}
        }, {status: 500})
    }

        
}
