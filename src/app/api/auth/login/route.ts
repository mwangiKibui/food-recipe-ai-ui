import {NextResponse} from 'next/server';
import {cookies} from 'next/headers';
import {LoginAPIResponse,LoginPayload} from '../../../../types/auth';

const loginURL = process.env.BACKEND_BASE_URL!+process.env.BACKEND_LOGIN_URL!

export async function POST(req:Request){
    if(req.method == "POST"){
        try{
            let data:LoginPayload = await req.json();
            let response = await fetch(loginURL,{
                method:"POST",
                body:JSON.stringify({
                    email:data.email,
                    password:data.password
                }),
                headers:{
                    "content-type":"application/json"
                }
            });
            let result:LoginAPIResponse = await response.json();
            if(result.success){
                // setting the access token
                cookies().set({
                    name:"accessToken",
                    value:result.data.accessToken,
                    httpOnly:true,
                    sameSite:"strict",
                    secure:true,
                    maxAge: parseInt(process.env.COOKIE_LIFETIME!),
                    expires: new Date(Date.now() + parseInt(process.env.COOKIE_LIFETIME!))
                });
                // setting the logged in user.
                cookies().set({
                    name:"loggedInUser",
                    value:JSON.stringify(result.data.user),
                    httpOnly:true,
                    sameSite:"strict",
                    secure:true,
                    maxAge: parseInt(process.env.COOKIE_LIFETIME!),
                    expires: new Date(Date.now() + parseInt(process.env.COOKIE_LIFETIME!))
                });
            }
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