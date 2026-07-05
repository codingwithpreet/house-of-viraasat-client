import { useParams } from "react-router-dom";
import AccountLayout from "../components/AccountLayout";
import OrderDetailsSection from "../components/OrderDetailsSection";
import { mockOrders } from "../data/account.data";

export default function OrderDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const order = mockOrders.find((o) => o.id === id || o.orderNumber === id);

  return (
    <AccountLayout>
      {order ? (
        <OrderDetailsSection order={order} />
      ) : (
        <div className="py-16 text-center text-xs font-sans text-[#1C1C1C]/50">
          Atelier order record not found in search index registry.
        </div>
      )}
    </AccountLayout>
  );
}
