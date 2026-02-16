"use server";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";
import {
  profileFormValues,
  profileSchema,
  changePasswordFormValues,
  changePasswordSchema,
} from "../schemas/profile.schema";
import { UpdateProfileResponse } from "../types/profile.types";
import { setToken } from "../../auth/server/auth.actions";

export async function getUserProfile() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;

  console.log("GetProfile - Token exists:", !!token);

  if (!token) {
    return {
      success: false,
      message: "Please login first",
    };
  }

  try {
    const options: AxiosRequestConfig = {
      url: "https://ecommerce.routemisr.com/api/v1/users/getMe",
      method: "GET",
      headers: {
        token,
      },
    };

    console.log("GetProfile - Sending request to:", options.url);

    const { data } = await axios.request(options);

    console.log("Get profile RAW response:", JSON.stringify(data, null, 2));

    return {
      success: true,
      data: data.data || data,
    };
  } catch (error) {
    console.error("Get profile error:", error);
    if (error instanceof AxiosError) {
      console.error(
        "Error response:",
        JSON.stringify(error.response?.data, null, 2),
      );
      console.error("Error status:", error.response?.status);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to get profile data",
      };
    }
    return {
      success: false,
      message: "Failed to get profile data",
    };
  }
}

export async function updateUserProfile(values: profileFormValues) {
  const validationResult = profileSchema.safeParse(values);

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

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;

  if (!token) {
    return {
      success: false,
      message: "Please login first",
    };
  }

  try {
    const options: AxiosRequestConfig = {
      url: "https://ecommerce.routemisr.com/api/v1/users/updateMe/",
      method: "PUT",
      headers: {
        token,
      },
      data: values,
    };

    console.log(
      "Sending update request with:",
      JSON.stringify(options, null, 2),
    );

    const { data } = await axios.request(options);

    console.log("Update profile RAW response:", JSON.stringify(data, null, 2));

    if (data.message === "success" || data.user) {
      return {
        success: true,
        message: "Profile updated successfully",
        data: {
          user: data.user || data.data,
        },
      };
    }

    return {
      success: false,
      message: data.message || "Failed to update profile",
    };
  } catch (error) {
    console.error("Update profile error:", error);
    if (error instanceof AxiosError) {
      console.error(
        "Error response RAW:",
        JSON.stringify(error.response?.data, null, 2),
      );
      console.error("Error status:", error.response?.status);
      console.error("Error headers:", error.response?.headers);

      const errorMessage = error.response?.data?.message;
      const apiErrors = error.response?.data?.errors;

      // Transform API error format to our format
      const formattedErrors: Record<string, string> = {};

      if (apiErrors) {
        // Check if errors is an array or object
        if (Array.isArray(apiErrors)) {
          apiErrors.forEach((err: any) => {
            if (err.param && err.msg) {
              formattedErrors[err.param] = err.msg;
            }
          });
        } else if (typeof apiErrors === "object") {
          // If it's a single error object with param and msg
          if (apiErrors.param && apiErrors.msg) {
            formattedErrors[apiErrors.param] = apiErrors.msg;
          } else {
            // If it's already in the right format
            Object.assign(formattedErrors, apiErrors);
          }
        }
      }

      return {
        success: false,
        message: errorMessage || "Failed to update profile",
        errors:
          Object.keys(formattedErrors).length > 0 ? formattedErrors : undefined,
      };
    }

    return {
      success: false,
      message: "Failed to update profile",
    };
  }
}

export async function changeUserPassword(values: changePasswordFormValues) {
  const validationResult = changePasswordSchema.safeParse(values);

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

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;

  if (!token) {
    return {
      success: false,
      message: "Please login first",
    };
  }

  try {
    const options: AxiosRequestConfig = {
      url: "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword/",
      method: "PUT",
      headers: {
        token,
      },
      data: values,
    };

    console.log("Sending change password request to:", options.url);
    console.log("Request headers:", options.headers);
    console.log("Request data:", JSON.stringify(values, null, 2));

    const { data } = await axios.request(options);

    console.log("Change password RAW response:", JSON.stringify(data, null, 2));

    // Check if password was changed successfully but requires re-login
    if (
      data.message === "User recently changed password! Please login again."
    ) {
      return {
        success: true,
        message:
          "Password changed successfully. Please login again with your new password.",
        requiresRelogin: true,
      };
    }

    if (data.message === "success" || data.token) {
      // Update token in cookies with new token
      if (data.token) {
        console.log("Updating token in cookies with new token");
        await setToken(data.token, true); // Use longer expiry for changed passwords
      }

      return {
        success: true,
        message: "Password changed successfully",
        data: data,
        token: data.token,
      };
    }

    return {
      success: false,
      message: data.message || "Failed to change password",
    };
  } catch (error) {
    console.error("Change password error - Full error object:", error);
    if (error instanceof AxiosError) {
      console.error(
        "Error response:",
        JSON.stringify(error.response?.data, null, 2),
      );
      console.error("Error status:", error.response?.status);
      console.error("Error config URL:", error.config?.url);
      console.error("Error config method:", error.config?.method);

      const errorMessage = error.response?.data?.message;

      // Check if password was actually changed but requires re-login
      if (
        errorMessage === "User recently changed password! Please login again."
      ) {
        return {
          success: true,
          message:
            "Password changed successfully. Please login again with your new password.",
          requiresRelogin: true,
        };
      }

      const apiErrors = error.response?.data?.errors;

      // Transform API error format to our format
      const formattedErrors: Record<string, string> = {};

      if (apiErrors) {
        if (Array.isArray(apiErrors)) {
          apiErrors.forEach((err: any) => {
            if (err.param && err.msg) {
              formattedErrors[err.param] = err.msg;
            }
          });
        } else if (typeof apiErrors === "object") {
          if (apiErrors.param && apiErrors.msg) {
            formattedErrors[apiErrors.param] = apiErrors.msg;
          } else {
            Object.assign(formattedErrors, apiErrors);
          }
        }
      }

      return {
        success: false,
        message: errorMessage || "Failed to change password",
        errors:
          Object.keys(formattedErrors).length > 0 ? formattedErrors : undefined,
      };
    }

    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to change password",
    };
  }
}
