"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faKey,
  faLock,
  faSpinner,
  faArrowRight,
  faArrowLeft,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  forgotPasswordFormValues,
  forgotPasswordSchema,
  verifyResetCodeFormValues,
  verifyResetCodeSchema,
  resetPasswordFormValues,
  resetPasswordSchema,
} from "../schemas/forgotPassword.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  sendResetCode,
  verifyResetCode,
  resetPassword,
} from "../server/forgotPassword.actions";
import { toast } from "react-toastify";
import Link from "next/link";

export default function ForgotPasswordScreen() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const router = useRouter();

  // Step 1: Email form
  const emailForm = useForm<forgotPasswordFormValues>({
    defaultValues: { email: "" },
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onSubmit",
  });

  // Step 2: Reset code form
  const codeForm = useForm<verifyResetCodeFormValues>({
    defaultValues: { resetCode: "" },
    resolver: zodResolver(verifyResetCodeSchema),
    mode: "onSubmit",
  });

  // Step 3: New password form
  const passwordForm = useForm<resetPasswordFormValues>({
    defaultValues: { email: "", newPassword: "" },
    resolver: zodResolver(resetPasswordSchema),
    mode: "onSubmit",
  });

  const handleSendCode: SubmitHandler<forgotPasswordFormValues> = async (
    values,
  ) => {
    try {
      const response = await sendResetCode(values);

      if (response.success) {
        setEmail(values.email);
        toast.success(response.message || "Reset code sent to your email");
        setStep(2);
      } else {
        if (response?.errors) {
          Object.keys(response.errors).forEach((key) => {
            emailForm.setError(key as keyof forgotPasswordFormValues, {
              message: response.errors[key],
            });
          });
        }
        toast.error(response.message || "Failed to send reset code");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const handleVerifyCode: SubmitHandler<verifyResetCodeFormValues> = async (
    values,
  ) => {
    try {
      const response = await verifyResetCode(values);

      if (response.success) {
        toast.success(response.message || "Code verified successfully");
        passwordForm.setValue("email", email);
        setStep(3);
      } else {
        if (response?.errors) {
          Object.keys(response.errors).forEach((key) => {
            codeForm.setError(key as keyof verifyResetCodeFormValues, {
              message: response.errors[key],
            });
          });
        }
        toast.error(response.message || "Invalid reset code");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const handleResetPassword: SubmitHandler<resetPasswordFormValues> = async (
    values,
  ) => {
    try {
      const response = await resetPassword(values);

      if (response.success) {
        toast.success(
          response.message ||
            "Password reset successfully! Redirecting to login...",
        );
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        if (response?.errors) {
          Object.keys(response.errors).forEach((key) => {
            passwordForm.setError(key as keyof resetPasswordFormValues, {
              message: response.errors[key],
            });
          });
        }
        toast.error(response.message || "Failed to reset password");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full">
        {/* Logo and Title */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2">
            <span className="text-green-600">Fresh</span>
            <span className="text-gray-900">Cart</span>
          </h1>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            Forgot Password
          </h2>
          <p className="text-gray-600 text-sm">
            {step === 1 && "Enter your email to receive a reset code"}
            {step === 2 && "Enter the code sent to your email"}
            {step === 3 && "Enter your new password"}
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= 1
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {step > 1 ? <FontAwesomeIcon icon={faCheckCircle} /> : "1"}
            </div>
            <div
              className={`w-16 h-1 ${step >= 2 ? "bg-green-600" : "bg-gray-200"}`}
            ></div>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= 2
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {step > 2 ? <FontAwesomeIcon icon={faCheckCircle} /> : "2"}
            </div>
            <div
              className={`w-16 h-1 ${step >= 3 ? "bg-green-600" : "bg-gray-200"}`}
            ></div>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= 3
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              3
            </div>
          </div>
        </div>

        {/* Step 1: Enter Email */}
        {step === 1 && (
          <form onSubmit={emailForm.handleSubmit(handleSendCode)}>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <FontAwesomeIcon icon={faEnvelope} className="text-sm" />
                </span>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  {...emailForm.register("email")}
                />
              </div>
              {emailForm.formState.errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  *{emailForm.formState.errors.email.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={emailForm.formState.isSubmitting}
              className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {emailForm.formState.isSubmitting ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send Reset Code
                  <FontAwesomeIcon icon={faArrowRight} />
                </>
              )}
            </button>
          </form>
        )}

        {/* Step 2: Enter Reset Code */}
        {step === 2 && (
          <form onSubmit={codeForm.handleSubmit(handleVerifyCode)}>
            <div className="mb-6">
              <label
                htmlFor="resetCode"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Reset Code
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <FontAwesomeIcon icon={faKey} className="text-sm" />
                </span>
                <input
                  type="text"
                  id="resetCode"
                  placeholder="Enter reset code"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-center text-lg tracking-widest"
                  {...codeForm.register("resetCode")}
                />
              </div>
              {codeForm.formState.errors.resetCode && (
                <p className="text-red-500 text-xs mt-1">
                  *{codeForm.formState.errors.resetCode.message}
                </p>
              )}
              <p className="text-gray-500 text-xs mt-2">
                Code sent to: <span className="font-semibold">{email}</span>
              </p>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
              >
                <FontAwesomeIcon icon={faArrowLeft} />
                Back
              </button>
              <button
                type="submit"
                disabled={codeForm.formState.isSubmitting}
                className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {codeForm.formState.isSubmitting ? (
                  <>
                    <FontAwesomeIcon
                      icon={faSpinner}
                      className="animate-spin"
                    />
                    Verifying...
                  </>
                ) : (
                  <>
                    Verify Code
                    <FontAwesomeIcon icon={faArrowRight} />
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Reset Password */}
        {step === 3 && (
          <form onSubmit={passwordForm.handleSubmit(handleResetPassword)}>
            <div className="mb-6">
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                New Password
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <FontAwesomeIcon icon={faLock} className="text-sm" />
                </span>
                <input
                  type="password"
                  id="newPassword"
                  placeholder="Enter your new password"
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  {...passwordForm.register("newPassword")}
                />
              </div>
              {passwordForm.formState.errors.newPassword && (
                <p className="text-red-500 text-xs mt-1">
                  *{passwordForm.formState.errors.newPassword.message}
                </p>
              )}
            </div>

            {/* Password Requirements */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600 font-semibold mb-2">
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

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
              >
                <FontAwesomeIcon icon={faArrowLeft} />
                Back
              </button>
              <button
                type="submit"
                disabled={passwordForm.formState.isSubmitting}
                className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {passwordForm.formState.isSubmitting ? (
                  <>
                    <FontAwesomeIcon
                      icon={faSpinner}
                      className="animate-spin"
                    />
                    Resetting...
                  </>
                ) : (
                  <>
                    Reset Password
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Back to Login */}
        <p className="text-center text-gray-600 mt-6 text-sm">
          Remember your password?{" "}
          <Link
            href="/login"
            className="text-green-600 font-semibold hover:underline"
          >
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
}
