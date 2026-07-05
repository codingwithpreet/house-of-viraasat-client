import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingBag, Eye, Calendar, DollarSign } from "lucide-react";
import { mockOrders } from "../data/account.data";

export default function OrdersSection() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredOrders = useMemo(() => {
    return mockOrders.filter((order) => {
      const matchesSearch =
        order.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
        order.items.some((i) => i.name.toLowerCase().includes(search.toLowerCase()));

      const matchesStatus = statusFilter === "All" || order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const getStatusColor = (status: string) => {
    if (status === "Processing") return "text-[#92400E] bg-[#92400E]/5 border-[#92400E]/20";
    if (status === "Delivered") return "text-[#2A5C3A] bg-[#2A5C3A]/5 border-[#2A5C3A]/20";
    return "text-[#1C1C1C]/40 bg-[#F5F2ED] border-[#E5E1DA]";
  };

  return (
    <div className="space-y-8 text-left animate-fade-in">
      {/* Editorial Header */}
      <div>
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-medium font-sans block mb-1">
          Couture History
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl text-[#1C1C1C] font-light tracking-wide">
          Order History
        </h1>
        <p className="font-sans text-xs text-[#1C1C1C]/50 mt-1">
          Review your historic orders, track active shipments, and generate atelier invoices.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between pb-4 border-b border-[#E5E1DA]">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="w-3.5 h-3.5 text-[#1C1C1C]/35" />
          </span>
          <input
            type="text"
            placeholder="Search orders or items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-[#E5E1DA] pl-9 pr-4 py-2.5 text-xs font-sans text-[#1C1C1C] placeholder-[#1C1C1C]/35 focus:outline-none focus:border-[#C5A059] bg-transparent rounded-none"
          />
        </div>

        {/* Status Filters */}
        <div className="flex gap-2">
          {["All", "Processing", "Delivered"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`border py-2.5 px-4 text-[10px] uppercase tracking-wider font-semibold font-sans transition-all cursor-pointer ${
                statusFilter === st
                  ? "bg-[#1C1C1C] border-[#1C1C1C] text-[#FDFCFB]"
                  : "border-[#E5E1DA] text-[#1C1C1C]/60 hover:border-[#C5A059]"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {filteredOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center border border-[#E5E1DA] space-y-4">
            <ShoppingBag className="w-10 h-10 text-[#1C1C1C]/15 stroke-[1]" />
            <div>
              <h3 className="font-serif text-base text-[#1C1C1C]">No Orders Found</h3>
              <p className="font-sans text-xs text-[#1C1C1C]/50 mt-1">
                We couldn't find any orders matching your filter criteria.
              </p>
            </div>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              className="border border-[#E5E1DA] hover:border-[#C5A059] transition-all"
            >
              {/* Order Header Grid */}
              <div className="bg-[#F5F2ED]/50 border-b border-[#E5E1DA] px-5 py-4 grid grid-cols-2 sm:grid-cols-4 gap-4 items-center text-xs font-sans">
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-[#1C1C1C]/50 block flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#C5A059]" />
                    Date Placed
                  </span>
                  <span className="font-semibold text-[#1C1C1C] mt-0.5 block">{order.date}</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-[#1C1C1C]/50 block flex items-center gap-1">
                    <DollarSign className="w-3 h-3 text-[#C5A059]" />
                    Amount
                  </span>
                  <span className="font-semibold text-[#1C1C1C] mt-0.5 block">
                    ₹{order.total.toLocaleString("en-IN")}
                  </span>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-[#1C1C1C]/50 block">
                    Order Number
                  </span>
                  <span className="font-serif text-[#1C1C1C] mt-0.5 block">
                    {order.orderNumber}
                  </span>
                </div>
                <div className="text-right sm:text-left">
                  <span
                    className={`inline-block border px-2.5 py-1 text-[9px] uppercase tracking-wider font-semibold ${getStatusColor(order.status)}`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Items Summary */}
              <div className="p-5 divide-y divide-[#E5E1DA]/55">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                    <div className="w-14 aspect-[3/4] overflow-hidden bg-[#F5F2ED] border border-[#E5E1DA]/50 flex-shrink-0">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div className="flex-grow min-w-0">
                      <h4 className="font-serif text-sm text-[#1C1C1C] line-clamp-1">
                        {item.name}
                      </h4>
                      <p className="text-[10px] font-sans text-[#1C1C1C]/50 mt-1">
                        Size: {item.size} · Colour: {item.color} · Qty: {item.quantity}
                      </p>
                      <span className="text-xs font-sans font-semibold text-[#1C1C1C] mt-1 block">
                        ₹{item.price.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Link
                        to={`/account/orders/${order.id}`}
                        className="flex items-center gap-1.5 border border-[#E5E1DA] hover:border-[#C5A059] py-2 px-3 text-[9px] uppercase tracking-wider font-semibold font-sans text-[#1C1C1C] transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
