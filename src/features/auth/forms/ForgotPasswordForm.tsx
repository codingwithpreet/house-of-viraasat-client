import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotSchema } from "../validation/forgot.schema";
import type { ForgotFields } from "../validation/forgot.schema";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { Link } from "react-router-dom";

export default function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotFields>({
    resolver: zodResolver(forgotSchema),
  });

  const onSubmit = (data: ForgotFields) => {
    console.log("recovery trigger dispatch:", data.email);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="space-y-6 text-center">
        <div className="bg-[#2A5C3A]/5 border border-[#2A5C3A]/20 text-[#2A5C3A] text-xs font-sans p-4 text-left leading-relaxed">
          A sovereign recovery link has been dispatched to your email address. Please access the
          link to configure your new credentials.
        </div>
        <Link
          to="/login"
          className="inline-block w-full bg-[#1C1C1C] text-[#FDFCFB] py-4 px-8 text-[11px] font-medium tracking-[0.3em] uppercase hover:bg-[#540B0E] transition-all duration-300 rounded-none text-center"
        >
          Return to Sign In
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label="Noble Email Address"
        placeholder="e.g. patel@heritage.in"
        error={errors.email?.message}
        {...register("email")}
      />

      <Button type="submit" isLoading={isLoading} className="w-full">
        Send Reset Link
      </Button>

      <div className="text-center text-xs font-sans">
        <Link
          to="/login"
          className="text-[#1C1C1C]/60 hover:text-[#1C1C1C] transition-colors hover:underline"
        >
          Back to Login
        </Link>
      </div>
    </form>
  );
}
