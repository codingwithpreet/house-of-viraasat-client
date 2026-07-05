import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../validation/register.schema";
import type { RegisterFields } from "../validation/register.schema";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { PasswordInput, PasswordStrength, AuthDivider } from "../components/AuthComponents";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFields>({
    resolver: zodResolver(registerSchema),
  });

  const passwordValue = watch("password", "");

  const onSubmit = async (data: RegisterFields) => {
    setIsLoading(true);
    setErrorMsg("");

    setTimeout(() => {
      setIsLoading(false);
      if (data.email === "fail@heritage.in") {
        setErrorMsg("This email already holds an active registry account.");
      } else {
        navigate("/verification-pending?email=" + encodeURIComponent(data.email));
      }
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {errorMsg && (
        <div className="bg-[#991B1B]/5 border border-[#991B1B]/20 text-[#991B1B] text-xs font-sans p-4 text-left">
          {errorMsg}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="First Name"
          placeholder="e.g. Aarav"
          error={errors.firstName?.message}
          {...register("firstName")}
        />
        <Input
          label="Last Name"
          placeholder="e.g. Patel"
          error={errors.lastName?.message}
          {...register("lastName")}
        />
      </div>

      <Input
        label="Noble Email Address"
        placeholder="e.g. aarav.patel@heritage.in"
        error={errors.email?.message}
        {...register("email")}
      />

      <Input
        label="Phone Number"
        placeholder="e.g. +919876543210"
        error={errors.phone?.message}
        {...register("phone")}
      />

      <div className="space-y-1">
        <PasswordInput
          label="Registry Password"
          placeholder="Create password"
          error={errors.password?.message}
          {...register("password")}
        />
        {passwordValue && <PasswordStrength value={passwordValue} />}
      </div>

      <PasswordInput
        label="Confirm Password"
        placeholder="Re-enter password"
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />

      <div className="space-y-1">
        <label className="flex items-start gap-2 cursor-pointer text-[10px] font-sans text-[#1C1C1C]/70 hover:text-[#1C1C1C]">
          <input
            type="checkbox"
            {...register("acceptTerms")}
            className="rounded-none border-[#E5E1DA] focus:ring-[#540B0E] mt-0.5"
          />
          <span className="leading-tight text-left">
            I accept the Sovereign Terms of Service and consent to receive invitations to private
            atelier drops.
          </span>
        </label>
        {errors.acceptTerms && (
          <span className="block text-[10px] text-[#991B1B] font-sans text-left">
            {errors.acceptTerms.message}
          </span>
        )}
      </div>

      <Button type="submit" isLoading={isLoading} className="w-full mt-2">
        Create Noble Account
      </Button>

      <AuthDivider />

      <div className="text-center text-xs font-sans text-[#1C1C1C]/60">
        Already registered?{" "}
        <Link to="/login" className="text-[#540B0E] font-medium hover:underline">
          Sign In
        </Link>
      </div>
    </form>
  );
}
