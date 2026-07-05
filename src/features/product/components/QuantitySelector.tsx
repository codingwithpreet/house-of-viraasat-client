import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
  quantity: number;
  onChange: (qty: number) => void;
  max?: number;
  disabled?: boolean;
}

export default function QuantitySelector({
  quantity,
  onChange,
  max = 10,
  disabled = false,
}: QuantitySelectorProps) {
  const decrement = () => {
    if (quantity > 1) onChange(quantity - 1);
  };

  const increment = () => {
    if (quantity < max) onChange(quantity + 1);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val >= 1 && val <= max) {
      onChange(val);
    }
  };

  return (
    <div className="space-y-2">
      <span className="text-[10px] uppercase tracking-widest font-semibold font-sans text-[#1C1C1C]">
        Quantity
      </span>
      <div
        className={`inline-flex items-center border border-[#E5E1DA] ${disabled ? "opacity-40" : ""}`}
      >
        <button
          onClick={decrement}
          disabled={disabled || quantity <= 1}
          aria-label="Decrease quantity"
          className="w-11 h-11 flex items-center justify-center hover:bg-[#F5F2ED] transition-colors disabled:opacity-30 disabled:cursor-not-allowed border-r border-[#E5E1DA] cursor-pointer"
        >
          <Minus className="w-3.5 h-3.5 stroke-[1.5]" />
        </button>

        <input
          type="number"
          value={quantity}
          onChange={handleInput}
          disabled={disabled}
          min={1}
          max={max}
          aria-label="Quantity"
          className="w-14 h-11 text-center text-sm font-sans font-semibold text-[#1C1C1C] bg-transparent border-none focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />

        <button
          onClick={increment}
          disabled={disabled || quantity >= max}
          aria-label="Increase quantity"
          className="w-11 h-11 flex items-center justify-center hover:bg-[#F5F2ED] transition-colors disabled:opacity-30 disabled:cursor-not-allowed border-l border-[#E5E1DA] cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5 stroke-[1.5]" />
        </button>
      </div>
      {quantity >= max && (
        <p className="text-[10px] font-sans text-[#92400E]">Maximum {max} units per order</p>
      )}
    </div>
  );
}
