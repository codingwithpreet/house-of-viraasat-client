import { useState } from "react";
import AccountLayout from "../components/AccountLayout";
import ProfileSection from "../components/ProfileSection";
import { mockProfile } from "../data/account.data";
import type { CustomerProfile } from "../data/account.data";

export default function ProfilePage() {
  const [profile, setProfile] = useState<CustomerProfile>(mockProfile);

  const handleUpdate = (updated: Partial<CustomerProfile>) => {
    setProfile((prev) => ({ ...prev, ...updated }));
  };

  return (
    <AccountLayout>
      <ProfileSection profile={profile} onUpdate={handleUpdate} />
    </AccountLayout>
  );
}
