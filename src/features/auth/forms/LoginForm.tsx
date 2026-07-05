import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../validation/login.schema";
import type { LoginFields } from "../validation/login.schema";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { PasswordInput, AuthDivider } from "../components/AuthComponents";
import { Link, useNavigate } from "react-router-dom";

export default function LoginForm() {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFields>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFields) => {
    setIsLoading(true);
    setErrorMsg("");

    // Simulate mock API request
    setTimeout(() => {
      setIsLoading(false);
      // Mock failure for a specific email to test error UI
      if (data.email === "fail@heritage.in") {
        setErrorMsg("The sovereign credentials provided do not match our registry.");
      } else {
        navigate("/auth-success?type=login");
      }
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {errorMsg && (
        <div className="bg-[#991B1B]/5 border border-[#991B1B]/20 text-[#991B1B] text-xs font-sans p-4 text-left">
          {errorMsg}
        </div>
      )}

      <Input
        label="Noble Email Address"
        placeholder="e.g. patel@heritage.in"
        error={errors.email?.message}
        {...register("email")}
      />

      <div className="space-y-2">
        <PasswordInput
          label="Registry Password"
          placeholder="Enter your password"
          error={errors.password?.message}
          {...register("password")}
        />
        <div className="flex justify-between items-center text-[10px] uppercase tracking-wider font-sans pt-1">
          <label className="flex items-center gap-2 cursor-pointer text-[#1C1C1C]/60 hover:text-[#1C1C1C]">
            <input
              type="checkbox"
              {...register("rememberMe")}
              className="rounded-none border-[#E5E1DA] focus:ring-[#540B0E]"
            />
            <span>Remember Me</span>
          </label>
          <Link to="/forgot-password" className="text-[#540B0E] hover:underline">
            Forgot Password?
          </Link>
        </div>
      </div>

      <Button type="submit" isLoading={isLoading} className="w-full">
        Sign In to Atelier
      </Button>

      <AuthDivider />

      <div className="text-center text-xs font-sans text-[#1C1C1C]/60">
        New to the House?{" "}
        <Link to="/register" className="text-[#540B0E] font-medium hover:underline">
          Create Noble Account
        </Link>
      </div>
    </form>
  );
}
