import {NextResponse} from 'next/server';
import {cookies} from 'next/headers';

export async function POST(req:Request){
    try{
        // delete the cookies.
        cookies().delete("accessToken");
        cookies().delete("loggedInUser");
        // return response:
        return NextResponse.json({
            success:true,
            message:"logged out successfully"
        })
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
}