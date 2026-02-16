import { Suspense } from "react";
import LoginHero from "../components/login/loginHero";
import LoginForm from "../components/login/loginForm";

export default function LoginScreen() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Login Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left Side - Hero */}
        <LoginHero />

        {/* Right Side - Form */}
        <Suspense
          fallback={
            <div className="flex items-center justify-center p-8">
              Loading...
            </div>
          }
        >
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
