import { Link } from "react-router-dom";
import { ArrowLeft, Check, Download, Package, Truck, HelpCircle, AlertCircle } from "lucide-react";
import type { OrderHistoryRecord } from "../data/account.data";
import { useToast } from "../../../providers/ToastProvider";

interface OrderDetailsSectionProps {
  order: OrderHistoryRecord;
}

export default function OrderDetailsSection({ order }: OrderDetailsSectionProps) {
  const { showToast } = useToast();

  const handleDownloadInvoice = () => {
    showToast("Preparing your PDF invoice download...", "info");
    setTimeout(() => {
      showToast("Invoice downloaded successfully.", "success");
    }, 1500);
  };

  const handleTrackShipment = () => {
    showToast("Fetching active carrier tracking parameters...", "info");
  };

  return (
    <div className="space-y-8 text-left animate-fade-in">
      {/* Back link */}
      <div>
        <Link
          to="/account/orders"
          className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-semibold font-sans text-[#1C1C1C]/50 hover:text-[#1C1C1C] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Order History
        </Link>
      </div>

      {/* Header Info */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b border-[#E5E1DA] pb-6">
        <div>
          <span className="text-[9px] uppercase tracking-wider text-[#C5A059] font-medium font-sans">
            Secure Order Summary
          </span>
          <h1 className="font-serif text-2xl text-[#1C1C1C] mt-0.5">{order.orderNumber}</h1>
          <p className="font-sans text-xs text-[#1C1C1C]/50 mt-1">
            Placed on {order.date} · Payment via {order.paymentMethod}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleDownloadInvoice}
            className="flex items-center gap-2 border border-[#E5E1DA] hover:border-[#C5A059] py-2.5 px-4 text-[10px] uppercase tracking-wider font-semibold font-sans text-[#1C1C1C] transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#C5A059]" />
            Download Invoice
          </button>
          {order.trackingNumber && (
            <button
              onClick={handleTrackShipment}
              className="flex items-center gap-2 bg-[#1C1C1C] text-[#FDFCFB] hover:bg-[#540B0E] py-2.5 px-4 text-[10px] uppercase tracking-wider font-semibold font-sans transition-all cursor-pointer"
            >
              <Truck className="w-4 h-4 text-[#C5A059]" />
              Track Package
            </button>
          )}
        </div>
      </div>

      {/* Order Status Timeline */}
      <div className="border border-[#E5E1DA] p-6 bg-[#F5F2ED]/30 space-y-6">
        <h3 className="text-[10px] uppercase tracking-widest font-semibold font-sans text-[#C5A059]">
          Couture Status Timeline
        </h3>
        <div className="space-y-4">
          {order.timeline.map((step, idx) => (
            <div key={idx} className="flex gap-4 items-start relative">
              {/* Connector line */}
              {idx < order.timeline.length - 1 && (
                <div
                  className={`absolute left-[13px] top-7 bottom-[-20px] w-0.5 ${
                    step.done && order.timeline[idx + 1].done ? "bg-[#C5A059]" : "bg-[#E5E1DA]"
                  }`}
                />
              )}

              {/* Status Circle */}
              <div
                className={`w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 text-[10px] font-bold font-sans transition-colors ${
                  step.done
                    ? "border-[#C5A059] bg-[#C5A059] text-[#FDFCFB]"
                    : "border-[#E5E1DA] bg-transparent text-[#1C1C1C]/20"
                }`}
              >
                {step.done ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : idx + 1}
              </div>

              <div>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] uppercase tracking-wider font-semibold font-sans text-[#1C1C1C]">
                    {step.title}
                  </span>
                  {step.date && (
                    <span className="text-[9px] font-sans text-[#1C1C1C]/40">{step.date}</span>
                  )}
                </div>
                <p className="font-sans text-xs text-[#1C1C1C]/55 leading-relaxed mt-0.5">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two-Column Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
        {/* Shipping Address & Estimate */}
        <div className="space-y-4">
          <div>
            <h4 className="text-[10px] uppercase tracking-widest font-semibold font-sans text-[#C5A059] mb-2 border-b border-[#E5E1DA] pb-1.5">
              Shipping Destination
            </h4>
            <p className="font-sans text-xs text-[#1C1C1C]/75 leading-relaxed">
              {order.shippingAddress}
            </p>
          </div>
          {order.estimatedDelivery && (
            <div>
              <h4 className="text-[10px] uppercase tracking-widest font-semibold font-sans text-[#C5A059] mb-1">
                Estimated Delivery
              </h4>
              <p className="font-serif text-sm font-semibold text-[#1C1C1C]">
                {order.estimatedDelivery}
              </p>
            </div>
          )}
        </div>

        {/* Actions Registry Panel */}
        <div className="border border-[#E5E1DA] p-5 space-y-4 bg-[#F5F2ED]/25">
          <h4 className="text-[10px] uppercase tracking-widest font-semibold font-sans text-[#1C1C1C] border-b border-[#E5E1DA] pb-2">
            Support & Alterations
          </h4>
          <div className="space-y-3 font-sans text-xs text-[#1C1C1C]/70">
            <button
              onClick={() => showToast("Alteration request forms initialized.", "info")}
              className="flex items-center gap-2 hover:text-[#540B0E] transition-colors w-full text-left cursor-pointer"
            >
              <Package className="w-4 h-4 text-[#C5A059]" />
              Request Fit Alteration (2 complimentary sessions)
            </button>
            <button
              onClick={() => showToast("Connecting with atelier concierge...", "info")}
              className="flex items-center gap-2 hover:text-[#540B0E] transition-colors w-full text-left cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-[#C5A059]" />
              Contact Atelier Concierge Support
            </button>
            <button
              onClick={() => showToast("Returns window is locked for this order status.", "error")}
              className="flex items-center gap-2 hover:text-[#540B0E] transition-colors w-full text-left cursor-pointer"
            >
              <AlertCircle className="w-4 h-4 text-[#991B1B]" />
              Returns & Cancel Policies
            </button>
          </div>
        </div>
      </div>

      {/* Items Section */}
      <div className="border border-[#E5E1DA] pt-4">
        <div className="px-5 py-2 border-b border-[#E5E1DA]">
          <span className="text-[9px] uppercase tracking-widest font-semibold font-sans text-[#1C1C1C]/60">
            Couture Line Items
          </span>
        </div>
        <div className="p-5 divide-y divide-[#E5E1DA]/40">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex gap-4 py-4 first:pt-0 last:pb-0">
              <div className="w-16 aspect-[3/4] overflow-hidden bg-[#F5F2ED] border border-[#E5E1DA]/55">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="flex-1 text-xs font-sans min-w-0">
                <h4 className="font-serif text-sm text-[#1C1C1C] line-clamp-1">{item.name}</h4>
                <div className="flex gap-3 text-[#1C1C1C]/50 mt-1">
                  <span>
                    Size: <strong className="text-[#1C1C1C]">{item.size}</strong>
                  </span>
                  <span>
                    Colour: <strong className="text-[#1C1C1C]">{item.color}</strong>
                  </span>
                  <span>
                    Qty: <strong className="text-[#1C1C1C]">{item.quantity}</strong>
                  </span>
                </div>
                <span className="font-semibold text-sm text-[#1C1C1C] mt-2 block">
                  ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
