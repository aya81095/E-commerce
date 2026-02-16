"use server"

import { signupFormValues, signupSchema } from "../schemas/signup.schema";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

export async function signupAction(values: signupFormValues) {
    const validationResult = signupSchema.safeParse(values);
    if (!validationResult.success) {
        const errors:Record<string, string>={};

        if(validationResult.error){
            validationResult.error.issues.forEach((issue) => {
                const field = issue.path[0] as string;
                const message = issue.message ;
                if(!errors[field]){
                    errors[field] = message;
                }
            });
        }

        return{
            success: false,
            message: "Validation Errors",
            errors
        }

    }

    // eslint-disable-next-line
    const { terms, ...requestBody } = values;
    try {
        const options:AxiosRequestConfig = {
            url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
            method: "POST",
            data: requestBody,
        };
        const{data}=await axios(options);
        if(data.message==="success"){
            return{
                success: true,
                message: "Account Created Successfully",
                data
            }
        }
        
        return{
            success: false,
            message: data.message || "Something went wrong",
            
            
        }
    } catch (error) {
        console.log(error);
        if(error instanceof AxiosError){
            const errorMessage = error.response?.data?.message;
            if(errorMessage==="Account Already Exists"){
                return{
                    success: false,
                    message: "Account exists",
                    errors:{
                        email:"An account with this email already exists"
                    } 
                }
                
                
            }
            return{
                success: false,
                message: errorMessage || "Something went wrong",
            }
        }

        return{
            success: false,
            message: "inexpected error occurred,please try again later",
        }
        
        
        
    }
}