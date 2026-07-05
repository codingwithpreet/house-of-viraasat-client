import { useState } from "react";
import AccountLayout from "../components/AccountLayout";
import DashboardSection from "../components/DashboardSection";
import { mockProfile, mockOrders } from "../data/account.data";

import { useDocumentMetadata } from "../../../hooks/useDocumentMetadata";

export default function DashboardPage() {
  useDocumentMetadata({
    title: "Client Dashboard",
    description:
      "Access your House of Viraasat account overview, loyalty membership, default addresses, and wishlist.",
  });

  const [profile] = useState(mockProfile);
  const [orders] = useState(mockOrders);

  return (
    <AccountLayout>
      <DashboardSection profile={profile} recentOrder={orders[0]} />
    </AccountLayout>
  );
}
