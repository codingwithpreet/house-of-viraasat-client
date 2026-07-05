import { useState } from "react";
import { Plus, MapPin } from "lucide-react";
import { AddressCard, AddressForm } from "../../commerce/components/CheckoutComponents";
import { mockAddresses } from "../../commerce/data/addresses.data";
import type { Address } from "../../commerce/data/addresses.data";
import { useToast } from "../../../providers/ToastProvider";

export default function AddressesSection() {
  const { showToast } = useToast();
  const [addresses, setAddresses] = useState<Address[]>(mockAddresses);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // We toggle selecting/setting default
  const handleSelectDefault = (id: string) => {
    setAddresses((prev) => prev.map((addr) => ({ ...addr, isDefault: addr.id === id })));
    showToast("Default delivery address updated.", "info");
  };

  const handleSave = (form: Omit<Address, "id" | "isDefault">) => {
    if (editingAddressId) {
      setAddresses((prev) =>
        prev.map((addr) => (addr.id === editingAddressId ? { ...addr, ...form } : addr)),
      );
      setEditingAddressId(null);
      showToast("Address updated successfully.", "success");
    } else {
      const created: Address = {
        ...form,
        id: `addr${Date.now()}`,
        isDefault: addresses.length === 0,
      };
      setAddresses((prev) => [...prev, created]);
      setShowForm(false);
      showToast("New delivery address added.", "success");
    }
  };

  const handleDelete = () => {
    if (deleteConfirmId) {
      setAddresses((prev) => prev.filter((a) => a.id !== deleteConfirmId));
      setDeleteConfirmId(null);
      showToast("Address deleted successfully.", "success");
    }
  };

  const activeEditAddress = addresses.find((a) => a.id === editingAddressId);

  return (
    <div className="space-y-8 text-left animate-fade-in">
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-medium font-sans block mb-1">
            Dispatch Workspace
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl text-[#1C1C1C] font-light tracking-wide">
            Saved Addresses
          </h1>
          <p className="font-sans text-xs text-[#1C1C1C]/50 mt-1">
            Manage your registered shipping coordinates for expedited checkout times.
          </p>
        </div>

        {!showForm && !editingAddressId && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-[#1C1C1C] text-[#FDFCFB] py-3 px-5 text-[10px] uppercase tracking-widest font-medium font-sans hover:bg-[#540B0E] transition-all cursor-pointer self-start"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Address
          </button>
        )}
      </div>

      {/* Inline Forms */}
      {(showForm || editingAddressId) && (
        <div className="border border-[#E5E1DA] p-1 bg-[#F5F2ED]/20">
          <AddressForm
            initial={activeEditAddress}
            onSave={handleSave}
            onCancel={() => {
              setShowForm(false);
              setEditingAddressId(null);
            }}
          />
        </div>
      )}

      {/* Addresses Grid */}
      {!showForm && !editingAddressId && (
        <>
          {addresses.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center border border-[#E5E1DA]">
              <MapPin className="w-10 h-10 text-[#1C1C1C]/20 mb-4" />
              <h3 className="font-serif text-base text-[#1C1C1C]">No Addresses Saved</h3>
              <p className="font-sans text-xs text-[#1C1C1C]/50 mt-1 max-w-xs">
                You haven't saved any shipping addresses to your profile book yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {addresses.map((addr) => (
                <AddressCard
                  key={addr.id}
                  address={addr}
                  selected={addr.isDefault}
                  onSelect={handleSelectDefault}
                  onEdit={(id) => setEditingAddressId(id)}
                  onDelete={(id) => setDeleteConfirmId(id)}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-title"
        >
          <div
            className="absolute inset-0 bg-[#1C1C1C]/50 backdrop-blur-xs"
            onClick={() => setDeleteConfirmId(null)}
          />
          <div className="relative bg-[#FDFCFB] max-w-sm w-full p-6 border border-[#E5E1DA] shadow-2xl space-y-5 z-10 text-center">
            <h4 id="delete-title" className="font-serif text-base text-[#1C1C1C] tracking-wide">
              Confirm Deletion
            </h4>
            <p className="font-sans text-xs text-[#1C1C1C]/55 leading-relaxed">
              Are you sure you wish to remove this delivery coordinates profile card from your
              address book?
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleDelete}
                className="flex-1 bg-[#991B1B] text-[#FDFCFB] py-3 text-[10px] uppercase tracking-widest font-medium font-sans hover:bg-[#1C1C1C] transition-all cursor-pointer"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 border border-[#E5E1DA] py-3 text-[10px] uppercase tracking-widest font-medium font-sans text-[#1C1C1C] hover:border-[#C5A059] transition-all cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
