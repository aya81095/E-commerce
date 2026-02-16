"use server";

import axios, { AxiosError, AxiosRequestConfig } from "axios";
import {
  forgotPasswordFormValues,
  forgotPasswordSchema,
  verifyResetCodeFormValues,
  verifyResetCodeSchema,
  resetPasswordFormValues,
  resetPasswordSchema,
} from "../schemas/forgotPassword.schema";

export async function sendResetCode(values: forgotPasswordFormValues) {
  const validationResult = forgotPasswordSchema.safeParse(values);

  if (!validationResult.success) {
    const errors: Record<string, string> = {};
    validationResult.error.issues.forEach((issue) => {
      const key = issue.path[0] as string;
      const message = issue.message;
      if (!errors[key]) {
        errors[key] = message;
      }
    });

    return {
      success: false,
      message: "Validation errors",
      errors,
    };
  }

  try {
    const options: AxiosRequestConfig = {
      url: "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
      method: "POST",
      data: values,
    };

    const { data } = await axios.request(options);
    console.log("Send reset code response:", data);

    if (data.statusMsg === "success" || data.message === "success") {
      return {
        success: true,
        message: "Reset code sent to your email successfully",
        data,
      };
    }

    return {
      success: false,
      message: data.message || "Failed to send reset code",
    };
  } catch (error) {
    console.error("Send reset code error:", error);
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.message;
      return {
        success: false,
        message: errorMessage || "Failed to send reset code",
      };
    }

    return {
      success: false,
      message: "Failed to send reset code",
    };
  }
}

export async function verifyResetCode(values: verifyResetCodeFormValues) {
  const validationResult = verifyResetCodeSchema.safeParse(values);

  if (!validationResult.success) {
    const errors: Record<string, string> = {};
    validationResult.error.issues.forEach((issue) => {
      const key = issue.path[0] as string;
      const message = issue.message;
      if (!errors[key]) {
        errors[key] = message;
      }
    });

    return {
      success: false,
      message: "Validation errors",
      errors,
    };
  }

  try {
    const options: AxiosRequestConfig = {
      url: "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
      method: "POST",
      data: values,
    };

    const { data } = await axios.request(options);
    console.log("Verify reset code response:", data);

    if (data.status === "Success") {
      return {
        success: true,
        message: "Reset code verified successfully",
        data,
      };
    }

    return {
      success: false,
      message: data.message || "Invalid reset code",
    };
  } catch (error) {
    console.error("Verify reset code error:", error);
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.message;
      return {
        success: false,
        message: errorMessage || "Invalid reset code",
      };
    }

    return {
      success: false,
      message: "Failed to verify reset code",
    };
  }
}

export async function resetPassword(values: resetPasswordFormValues) {
  const validationResult = resetPasswordSchema.safeParse(values);

  if (!validationResult.success) {
    const errors: Record<string, string> = {};
    validationResult.error.issues.forEach((issue) => {
      const key = issue.path[0] as string;
      const message = issue.message;
      if (!errors[key]) {
        errors[key] = message;
      }
    });

    return {
      success: false,
      message: "Validation errors",
      errors,
    };
  }

  try {
    const options: AxiosRequestConfig = {
      url: "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
      method: "PUT",
      data: values,
    };

    const { data } = await axios.request(options);
    console.log("Reset password response:", data);

    if (data.token) {
      return {
        success: true,
        message: "Password reset successfully",
        data,
        token: data.token,
      };
    }

    return {
      success: false,
      message: data.message || "Failed to reset password",
    };
  } catch (error) {
    console.error("Reset password error:", error);
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.message;
      return {
        success: false,
        message: errorMessage || "Failed to reset password",
      };
    }

    return {
      success: false,
      message: "Failed to reset password",
    };
  }
}
