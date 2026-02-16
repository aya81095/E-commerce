import SignupHero from '../components/signup/signupHero';
import SignupForm from '../components/signup/signupForm';
import AccountBenefits from '../components/signup/accountBenefits';

export default function SignupScreen() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Signup Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left Side - Hero */}
        <SignupHero />
        
        {/* Right Side - Form */}
        <SignupForm />
      </div>

      {/* Bottom Section - Benefits */}
      <AccountBenefits />
    </div>
  );
};
