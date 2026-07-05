import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetSchema } from "../validation/reset.schema";
import type { ResetFields } from "../validation/reset.schema";
import Button from "../../../components/Button";
import { PasswordInput, PasswordStrength } from "../components/AuthComponents";
import { useNavigate } from "react-router-dom";

export default function ResetPasswordForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetFields>({
    resolver: zodResolver(resetSchema),
  });

  const passwordValue = watch("password", "");

  const onSubmit = (data: ResetFields) => {
    console.log("Password reset configuration request:", data.password);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/auth-success?type=reset");
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-1">
        <PasswordInput
          label="New Registry Password"
          placeholder="Enter new password"
          error={errors.password?.message}
          {...register("password")}
        />
        {passwordValue && <PasswordStrength value={passwordValue} />}
      </div>

      <PasswordInput
        label="Confirm New Password"
        placeholder="Confirm new password"
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />

      <Button type="submit" isLoading={isLoading} className="w-full">
        Reset Password
      </Button>
    </form>
  );
}
