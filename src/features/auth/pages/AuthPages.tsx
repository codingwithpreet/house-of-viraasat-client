import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle, Mail, Sparkles, ShieldCheck } from "lucide-react";
import { AuthLayout, AuthCard, AuthHeader } from "../components/AuthComponents";
import LoginForm from "../forms/LoginForm";
import RegisterForm from "../forms/RegisterForm";
import ForgotPasswordForm from "../forms/ForgotPasswordForm";
import ResetPasswordForm from "../forms/ResetPasswordForm";
import Button from "../../../components/Button";

// --- LOGIN PAGE ---
export function LoginPage() {
  return (
    <AuthLayout>
      <AuthCard>
        <AuthHeader
          title="Sign In to Atelier"
          subtitle="Access your orders, saved addresses, and sovereign khaan loyalty points."
        />
        <LoginForm />
      </AuthCard>
    </AuthLayout>
  );
}

// --- REGISTER PAGE ---
export function RegisterPage() {
  return (
    <AuthLayout>
      <AuthCard>
        <AuthHeader
          title="Create Noble Account"
          subtitle="Register to track your custom tailoring progress and unlock premium loyalty privileges."
        />
        <RegisterForm />
      </AuthCard>
    </AuthLayout>
  );
}

// --- FORGOT PASSWORD PAGE ---
export function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <AuthCard>
        <AuthHeader
          title="Recover Registry Account"
          subtitle="Enter your email address and we will dispatch a secure recovery link."
        />
        <ForgotPasswordForm />
      </AuthCard>
    </AuthLayout>
  );
}

// --- RESET PASSWORD PAGE ---
export function ResetPasswordPage() {
  return (
    <AuthLayout>
      <AuthCard>
        <AuthHeader
          title="Configure Registry Password"
          subtitle="Create a new secure credentials check for your account."
        />
        <ResetPasswordForm />
      </AuthCard>
    </AuthLayout>
  );
}

// --- EMAIL VERIFICATION PAGE ---
export function VerifyEmailPage() {
  return (
    <AuthLayout>
      <AuthCard>
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <CheckCircle className="w-16 h-16 text-[#2A5C3A] stroke-[1]" />
          </div>

          <AuthHeader
            title="Email Verification Successful"
            subtitle="Your email address has been authenticated against our heritage registry."
          />

          <div className="pt-4">
            <Link
              to="/login"
              className="inline-block w-full bg-[#1C1C1C] text-[#FDFCFB] py-4 px-8 text-[11px] font-medium tracking-[0.3em] uppercase hover:bg-[#540B0E] transition-all duration-300 rounded-none text-center"
            >
              Continue to Sign In
            </Link>
          </div>
        </div>
      </AuthCard>
    </AuthLayout>
  );
}

// --- VERIFICATION PENDING PAGE ---
export function VerificationPendingPage() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") || "your noble email";

  const [countdown, setCountdown] = useState(60);
  const [isResent, setIsResent] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleResend = () => {
    setCountdown(60);
    setIsResent(true);
    setTimeout(() => setIsResent(false), 3000);
  };

  return (
    <AuthLayout>
      <AuthCard>
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <Mail className="w-16 h-16 text-[#C5A059] stroke-[1] animate-pulse" />
          </div>

          <AuthHeader
            title="Registry Verification Sent"
            subtitle={`We have dispatched an email verification request to: ${email}`}
          />

          <p className="font-sans text-xs text-[#1C1C1C]/60 leading-relaxed">
            Please check your inbox (and spam folder) to complete your account setup.
          </p>

          {isResent && (
            <div className="bg-[#2A5C3A]/5 border border-[#2A5C3A]/25 text-[#2A5C3A] text-[10px] uppercase tracking-wider p-3">
              ✓ Verification dispatch resent successfully.
            </div>
          )}

          <div className="pt-4 space-y-4">
            <Button
              onClick={handleResend}
              disabled={countdown > 0}
              variant="secondary"
              className="w-full text-center"
            >
              {countdown > 0 ? `Resend Dispatch (${countdown}s)` : "Resend Verification Email"}
            </Button>

            <div className="text-xs font-sans text-[#1C1C1C]/50">
              Incorrect address?{" "}
              <Link to="/register" className="text-[#540B0E] hover:underline font-medium">
                Change Email Address
              </Link>
            </div>
          </div>
        </div>
      </AuthCard>
    </AuthLayout>
  );
}

// --- MULTI-PURPOSE AUTH SUCCESS PAGE ---
export function AuthSuccessPage() {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") || "register";

  const content = {
    login: {
      icon: ShieldCheck,
      title: "Welcome Back to the Atelier",
      subtitle: "Your credentials have been securely verified. Welcome to House of Viraasat.",
      btnText: "Explore Collections",
      btnLink: "/products",
    },
    register: {
      icon: Sparkles,
      title: "Noble Registry Activated",
      subtitle:
        "Welcome to House of Viraasat. Your account is active and loyalty point earnings have commenced.",
      btnText: "Go to Dashboard",
      btnLink: "/account/profile",
    },
    reset: {
      icon: CheckCircle,
      title: "Registry Password Reset",
      subtitle:
        "Your credentials have been securely configured. You can now sign in using your new password.",
      btnText: "Sign In to Atelier",
      btnLink: "/login",
    },
  }[type as "login" | "register" | "reset"] || {
    icon: CheckCircle,
    title: "Atelier Step Complete",
    subtitle: "Your verification or configuration was successful.",
    btnText: "Return to Home",
    btnLink: "/",
  };

  const IconComponent = content.icon;

  return (
    <AuthLayout>
      <AuthCard>
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <IconComponent className="w-16 h-16 text-[#C5A059] stroke-[1]" />
          </div>

          <AuthHeader title={content.title} subtitle={content.subtitle} />

          <div className="pt-4">
            <Link
              to={content.btnLink}
              className="inline-block w-full bg-[#1C1C1C] text-[#FDFCFB] py-4 px-8 text-[11px] font-medium tracking-[0.3em] uppercase hover:bg-[#540B0E] transition-all duration-300 rounded-none text-center"
            >
              {content.btnText}
            </Link>
          </div>
        </div>
      </AuthCard>
    </AuthLayout>
  );
}
