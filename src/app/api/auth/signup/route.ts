import {NextResponse} from 'next/server';
import {RegisterAPIResponse,RegisterPayload} from '../../../../types/auth';

const signupURL = process.env.BACKEND_BASE_URL!+process.env.BACKEND_SIGNUP_URL!

export async function POST(req:Request){
    if(req.method == "POST"){
        try{
            let data:RegisterPayload = await req.json();
            let response = await fetch(signupURL,{
                method:"POST",
                body:JSON.stringify({
                    name:data.name,
                    email:data.email,
                    password:data.password
                }),
                headers:{
                    "content-type":"application/json"
                }
            });
            let result:RegisterAPIResponse = await response.json();
            return NextResponse.json(result);
        }catch(error){
            if(error instanceof Error){
                return NextResponse.json({
                    success:false,
                    message:error.message
                })
            }else{
                return NextResponse.json({
                    success:false,
                    message:"An error occurred.Try again"
                })
            }
        }
    }else{
        return NextResponse.json({
            success:false,
            message:"No such route exists."
        });
    }
}