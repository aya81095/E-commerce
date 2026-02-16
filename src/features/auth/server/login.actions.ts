"use server"
import axios, { AxiosError } from "axios";
import { AxiosRequestConfig } from "axios";
import { loginFormValues, loginSchema } from "../schemas/login.schema";

export default async function loginAction(values: loginFormValues) {
    const validationResult =loginSchema.safeParse(values)
    if(!validationResult.success){
        const errors: Record<string, string> = {}
        validationResult.error.issues.forEach((issue) => {
            const key = issue.path[0] as string;
            const message = issue.message;
            if(!errors[key]){
                errors[key] = message
            }
        })

        return {
            success: false,
            message:"validation errors",
            errors
        }
    }

    try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {rememberMe, ...restValues} = values

        const options:AxiosRequestConfig = {
            url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
            method: "POST",
            data: restValues,   
        }
        const {data} = await axios.request(options)
        if(data.message === "success"){
            return {
                success: true,
                message:"Login successfully! Welcome back",
                data
            }
        }
        return {
            success: false,
            message: "Login failed",
        }
        
    } catch (error) {
        if(error instanceof AxiosError){
            const errorMessage = error.response?.data?.message;
            if(errorMessage==="Incorrect email or password"){
                return {
                    success: false,
                    message: "Incorrect email or password",
                    errors: {
                        password: "Incorrect email or password",
                    }
                }
            }
        }

        return {
            success: false,
            message: "Login failed",
        }
        
    }
    
}