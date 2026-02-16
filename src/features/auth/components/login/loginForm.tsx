'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faEye, faEyeSlash, faLock, faSpinner, faStar, faUsers } from '@fortawesome/free-solid-svg-icons';
import { useForm, SubmitHandler } from 'react-hook-form';
import { loginFormValues, loginSchema } from '../../schemas/login.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import loginAction from '../../server/login.actions';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { setToken } from '../../server/auth.actions';
import { setAuthInfo } from '../../store/auth.slice';
import { useDispatch } from 'react-redux';
export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const {register, handleSubmit,setError, formState: {errors,isSubmitting,isDirty}} = useForm<loginFormValues>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },

    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  })

  const onSubmit: SubmitHandler<loginFormValues> = async (values) => {
    try {
        const response = await loginAction(values);
        if(response.success){
          console.log(response.data);
          // set token
          await setToken(response.data.token , values.rememberMe)
          // set auth info
          dispatch(setAuthInfo({isAuthenticated:true,userInfo:response.data.user}))
          
            toast.success(response?.message);
            setTimeout(() => {
                router.push("/")    
            }, 2000)
        }
        else{
            if(response?.errors){
                Object.keys(response.errors).forEach((key) => {
                   setError(key as keyof loginFormValues,{message:response.errors[key]})
                });
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
        {/* Logo and Title */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2">
            <span className="text-green-600">Fresh</span>
            <span className="text-gray-900">Cart</span>
          </h1>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Welcome Back!</h2>
          <p className="text-gray-600 text-sm">
            Sign in to continue your fresh shopping experience
          </p>
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-3 mb-5">
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
          >
            <FontAwesomeIcon icon={faGoogle} className="text-red-500" />
            <span className="font-medium text-gray-700">Continue with Google</span>
          </button>
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
          >
            <FontAwesomeIcon icon={faFacebook} className="text-blue-600" />
            <span className="font-medium text-gray-700">Continue with Facebook</span>
          </button>
        </div>

        <div className="flex items-center gap-4 mb-5">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="text-gray-500 text-sm">OR CONTINUE WITH EMAIL</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email Address */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-xs font-medium text-gray-700 mb-1.5">
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
                className="w-full pl-10 pr-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                {...register("email")}
              />
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1">*{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="mb-3">
            <label htmlFor="password" className="block text-xs font-medium text-gray-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <FontAwesomeIcon icon={faLock} className="text-sm" />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="Enter your password"
                className="w-full pl-10 pr-10 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 text-sm"
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="text-sm" />
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">*{errors.password.message}</p>}
          </div>

          {/* Keep me signed in & Forgot Password */}
          <div className="flex items-center justify-between mb-5">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                {...register("rememberMe")}
              />
              <span className="text-sm text-gray-600">Keep me signed in</span>
            </label>
            <Link href="/forgot-password" className="text-sm text-green-600 hover:underline font-medium">
              Forgot Password?
            </Link>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={isSubmitting || !isDirty}
            className="w-full bg-green-600 text-white py-2.5 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? <><FontAwesomeIcon icon={faSpinner} className="animate-spin" /> Signing in...</>: "Sign In"}
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="text-center text-gray-600 mt-5 text-sm">
          New to FreshCart?{' '}
          <Link href="/signup" className="text-green-600 font-semibold hover:underline">
            Create an account
          </Link>
        </p>

        {/* Security Info */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-center gap-6 text-xs text-gray-500">
            <div className="flex items-center flex-col md:flex-row gap-2">
              <FontAwesomeIcon icon={faLock} className="text-sm" />
              <span>SSL Secured</span>
            </div>
            <div className="flex items-center flex-col md:flex-row gap-2">
              <FontAwesomeIcon icon={faUsers} className="text-sm" />
              <span>50k+ Users</span>
            </div>
            <div className="flex items-center flex-col md:flex-row gap-2">
              <FontAwesomeIcon icon={faStar} className="text-sm" />
              <span>4.9 Rating</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

