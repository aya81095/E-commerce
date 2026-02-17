"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faEye,
  faEyeSlash,
  faSpinner,
  faKey,
} from "@fortawesome/free-solid-svg-icons";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  changePasswordFormValues,
  changePasswordSchema,
} from "../schemas/profile.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { changeUserPassword } from "../server/profile.actions";
import { toast } from "react-toastify";
import { removeToken } from "../../auth/server/auth.actions";
import { setAuthInfo } from "../../auth/store/auth.slice";
import { useAppDispatch } from "@/src/store/store";

export default function ChangePasswordForm() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<changePasswordFormValues>({
    defaultValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
    resolver: zodResolver(changePasswordSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<changePasswordFormValues> = async (values) => {
    try {
      console.log("Submitting password change");
      const response = await changeUserPassword(values);
      console.log("Change password response:", response);
      console.log("Response details:", JSON.stringify(response, null, 2));

      if (response.success) {
        // Check if API requires re-login
        if (response.requiresRelogin) {
          toast.success(
            response.message ||
              "Password changed successfully! Redirecting to login...",
          );

          console.log(
            "Password changed, clearing auth and redirecting to login with redirect=/profile",
          );

          // Clear auth state
          dispatch(
            setAuthInfo({
              isAuthenticated: false,
              userInfo: null,
            }),
          );

          // Remove token
          await removeToken();

          // Redirect to login with return URL to profile
          setTimeout(() => {
            console.log("Navigating to: /login?redirect=/profile");
            router.push("/login?redirect=/profile");
          }, 2000);
        } else {
          if (response.token) {
            console.log("Token updated successfully with new token");
          }
          toast.success(
            response.message ||
              "Password changed successfully. You are now logged in with the new password.",
          );
          reset(); // Clear the form after successful change
        }
      } else {
        console.error("Password change failed. Response:", response);
        if (response?.errors && typeof response.errors === "object") {
          Object.keys(response.errors).forEach((key) => {
            const errorMessage = response.errors?.[key];
            if (errorMessage) {
              console.log(`Setting error for ${key}:`, errorMessage);
              setError(key as keyof changePasswordFormValues, {
                message: errorMessage,
              });
            }
          });
        }
        toast.error(response.message || "Failed to change password");
      }
    } catch (error) {
      console.error("Password change exception:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 mt-6">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <FontAwesomeIcon icon={faKey} className="text-green-600" />
        Change Password
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Current Password Field */}
        <div className="mb-6">
          <label
            htmlFor="currentPassword"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Current Password
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <FontAwesomeIcon icon={faLock} className="text-sm" />
            </span>
            <input
              type={showCurrentPassword ? "text" : "password"}
              id="currentPassword"
              placeholder="Enter your current password"
              className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              {...register("currentPassword")}
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              <FontAwesomeIcon
                icon={showCurrentPassword ? faEyeSlash : faEye}
                className="text-sm"
              />
            </button>
          </div>
          {errors.currentPassword && (
            <p className="text-red-500 text-xs mt-1">
              *{errors.currentPassword.message}
            </p>
          )}
        </div>

        {/* New Password Field */}
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            New Password
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <FontAwesomeIcon icon={faLock} className="text-sm" />
            </span>
            <input
              type={showNewPassword ? "text" : "password"}
              id="password"
              placeholder="Enter your new password"
              className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              <FontAwesomeIcon
                icon={showNewPassword ? faEyeSlash : faEye}
                className="text-sm"
              />
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              *{errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="mb-6">
          <label
            htmlFor="rePassword"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Confirm New Password
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <FontAwesomeIcon icon={faLock} className="text-sm" />
            </span>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="rePassword"
              placeholder="Confirm your new password"
              className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              {...register("rePassword")}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              <FontAwesomeIcon
                icon={showConfirmPassword ? faEyeSlash : faEye}
                className="text-sm"
              />
            </button>
          </div>
          {errors.rePassword && (
            <p className="text-red-500 text-xs mt-1">
              *{errors.rePassword.message}
            </p>
          )}
        </div>

        {/* Password Requirements */}
        <div className="mb-6 p-3 sm:p-4 bg-gray-50 rounded-lg">
          <p className="text-xs sm:text-sm text-gray-600 font-semibold mb-2">
            Password must contain:
          </p>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• At least 8 characters</li>
            <li>• At least one uppercase letter</li>
            <li>• At least one lowercase letter</li>
            <li>• At least one number</li>
            <li>• At least one special character (!@#$%^&*...)</li>
          </ul>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || !isDirty}
          className="w-full bg-green-600 text-white py-3 px-4 sm:px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
        >
          {isSubmitting ? (
            <>
              <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
              Changing Password...
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faKey} />
              Change Password
            </>
          )}
        </button>
      </form>
    </div>
  );
}
