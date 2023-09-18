import axios from 'axios'
import { NextResponse, NextRequest } from 'next/server'

export async function POST(request) {
    const requestBody = await request.json()
    console.log(requestBody);
    const res = axios.post( , requestBody)
    const response = await res.json()
    console.log(response);
    
    return NextResponse.json({message: "Successfully get the data .", data: response})
}