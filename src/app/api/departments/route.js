import { NextResponse, NextRequest } from 'next/server'

export async function GET(request) {
    try {
        const dataResponse = await fetch("http://127.0.0.1:8000/v1/api/department/")
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
                    'Content-Type': 'application/json'
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
