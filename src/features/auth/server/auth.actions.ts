"use server"

import { cookies } from "next/headers"
import { authState } from "../store/auth.slice";
import axios, { AxiosRequestConfig } from "axios";

export async function setToken(token:string,rememberMe:boolean):Promise<void>{
    const cookieStore= await cookies();
    
    if(rememberMe){
        cookieStore.set("token",token,{
            httpOnly:true,
            maxAge:30*24*60*60,
        })
    }else{
        cookieStore.set("token",token,{
            httpOnly:true,
            maxAge:1*24*60*60,
        })
    }


}

export async function getToken ():Promise<string | null>{
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value || null;
    return token; 
}

export async function removeToken():Promise<void>{
    const cookieStore = await cookies();
    cookieStore.delete("token");
}

export async function verifyToken():Promise<authState>{
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value || null;

    if (!token){
        return {
            isAuthenticated:false,
            userInfo:null,
        }
    }

    try{
        const options:AxiosRequestConfig={
            url:"https://ecommerce.routemisr.com/api/v1/auth/verifyToken",
            method:"GET",
            headers:{
                token,
            }
        }
        const {data} = await axios.request(options);
        if (data.message==="verified"){
            return {
                isAuthenticated:true,
                userInfo:{
                    name:data.decoded.name,
                    id:data.decoded.id,
                    role:data.decoded.role,
                },
            }
        }

        return {
            isAuthenticated:false,
            userInfo:null,
        }
    }catch(error){
        console.log(error);
        return {
            isAuthenticated:false,
            userInfo:null,
        }
        
    }
}