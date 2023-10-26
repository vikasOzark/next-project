import { NextResponse, NextRequest } from 'next/server'
import { cookies } from 'next/headers'
export async function POST(request) {
    try {
        const requestBody = await request.json()
        console.log(requestBody);
        
        // const dataResponse = await fetch('http://127.0.0.1:8000/v1/api/auth/login/', {
        //         method: 'POST',
        //         headers: {
        //             'Accept': 'application/json',
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify(requestBody)
        //     })
        //     const response = await dataResponse.json()
        //     if (response.success) {
        //         const cookieData = response.data
        //         cookies().set("token", cookieData.token, {httpOnly:true})
        //         cookies().set("email",cookieData.user_data.email)
        //         cookies().set("username",cookieData.user_data.username)
        //         cookies().set("first_name",cookieData.user_data.first_name)
        //         cookies().set("is_superuser",cookieData.user_data.is_superuser)
        //         cookies().set("is_staff",cookieData.user_data.is_staff)
        //         return NextResponse.json(response, {status: response.status_code})
        //     } else {
        //         return NextResponse.json(response, {status: response.status_code})
        //     }
            
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: 'Something went wrong!',
            success: false,
            data: {},
            status_code: 500
          },{status: 500})
    }
}
