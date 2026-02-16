"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faEye, faEyeSlash, faSpinner, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, signupFormValues } from "../../schemas/signup.schema";
import { useState } from "react";
import { signupAction } from "../../server/signup.actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


export default function SignupForm() {

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }


  const {register, handleSubmit, formState: {errors, isSubmitting,isDirty }, setError} = useForm<signupFormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
      terms: false
}
,
resolver: zodResolver(signupSchema),
mode: "onSubmit",
reValidateMode: "onChange",
    
  })

  const onSubmit: SubmitHandler<signupFormValues> = async (values) => {
    try {
    const response = await signupAction(values);
    if(response?.success){
      toast.success("Account Created Successfully");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
      console.log(response);
    }else{     
      if(response?.errors){
        console.log(response.errors);
        
        Object.keys(response.errors).forEach((key) => {
          setError(key as keyof signupFormValues, {
            message: response.errors[key]
          });
        });
        console.log(response);
      }
    }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="bg-gray-50 flex items-center justify-center lg:justify-start lg:pl-10 p-6 lg:p-8">
      <div className="bg-white p-6 lg:p-8 rounded-xl shadow-sm max-w-xl w-full">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-1">
          Create Your Account
        </h2>
        <p className="text-gray-600 text-center text-sm mb-6">
          Start your fresh journey with us today
        </p>

        {/* Social Login Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <button
            type="button"
            className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
          >
            <FontAwesomeIcon icon={faGoogle} className="text-red-500" />
            <span className="font-medium text-gray-700">Google</span>
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
          >
            <FontAwesomeIcon icon={faFacebook} className="text-blue-600" />
            <span className="font-medium text-gray-700">Facebook</span>
          </button>
        </div>

        <div className="flex items-center gap-4 mb-5">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="text-gray-500 text-sm">OR</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
            <div className="mb-3">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                placeholder="John Doe"
                className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                {...register("name")}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">*{errors.name.message}</p>}
            </div>

          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              placeholder="john.doe@example.com"
              className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              {...register("email")}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">*{errors.email.message}</p>}
            </div>

          {/* Phone */}
          <div className="mb-3">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              placeholder="01234567890"
              className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              {...register("phone")}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">*{errors.phone.message}</p>}
          </div>

          {/* Password */}
          <div className="mb-3">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Create a strong password"
                className="w-full px-3 py-2.5 pr-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                {...register("password")}
              />
                <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 text-sm"
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="text-sm cursor-pointer" onClick={togglePasswordVisibility}/>
              </button>
            </div>

            {/* password strength indicator */}
            <div className="password-strength flex items-center gap-2">
                <div className="bar w-full h-1 bg-gray-200 rounded-full ">
                <div className="progress w-1/4 h-full bg-red-500 rounded-full"></div>
            </div>
            <span className="text-sm text-gray-500">Week</span>
            </div>
             {errors.password ? (<p className="text-red-500 text-xs mt-1">*{errors.password.message}</p>) : (<p className="text-xs text-gray-500">*Must be at least 8 characters with numbers and symbols</p>)}
          </div>


          {/* Confirm Password */}
          <div className="mb-4">
            <label htmlFor="rePassword" className="block text-sm font-medium text-gray-700 mb-1.5">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="rePassword"
                placeholder="Confirm your password"
                className="w-full px-3 py-2.5 pr-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                {...register("rePassword")}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 text-sm"
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="text-sm cursor-pointer" onClick={togglePasswordVisibility}/>
              </button>
            </div>
            {errors.rePassword && <p className="text-red-500 text-xs mt-1">*{errors.rePassword.message}</p>}
          </div>

          {/* Checkboxes */}
          <div className="mb-5">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                className="accent-primary-600 mt-0.5 w-4 h-4 border-gray-300 rounded "
                {...register("terms")}
              />
              <span className="text-sm text-gray-600">
                I agree to the{' '}
                <Link href="/terms" className="text-green-600 hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy-policy" className="text-green-600 hover:underline">
                  Privacy Policy
                </Link>{' '}
                <span className="text-red-500">*</span>
              </span>
            </label>
            {errors.terms && <p className="text-red-500 text-xs mt-1">*{errors.terms.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || !isDirty}
            className="w-full bg-green-600 text-white py-2.5 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? <FontAwesomeIcon icon={faSpinner} className="animate-spin" /> : <FontAwesomeIcon icon={faUserPlus} />}
            <span>{isSubmitting ? "Creating Account..." : "Create My Account"}</span>
          </button>
        </form>

        {/* Sign In Link */}
        <p className="text-center text-gray-600 mt-4 text-sm">
          Already have an account?{' '}
          <Link href="/login" className="text-green-600 font-semibold hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};
