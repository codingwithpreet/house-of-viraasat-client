import { useState } from "react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubmitted(true);
  };

  return (
    <section className="py-16 sm:py-24 bg-[#F5F2ED] border-t border-[#E5E1DA]">
      <div className="max-w-2xl mx-auto px-4 text-center space-y-6">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-medium font-sans block">
          PRIVATE COMMUNICATIONS
        </span>

        <h2 className="font-serif text-2xl sm:text-4xl text-[#1C1C1C] font-light tracking-wide">
          Subscribe to the Viraasat Registry
        </h2>

        <p className="font-sans text-xs text-[#1C1C1C]/60 max-w-md mx-auto leading-relaxed">
          Receive exclusive dispatches regarding seasonal collections, private atelier trunk shows,
          and handloom craftsmanship reports.
        </p>

        {isSubmitted ? (
          <div className="font-serif text-xs text-[#2A5C3A] tracking-wider uppercase py-4 border border-[#2A5C3A]/25 bg-[#2A5C3A]/5">
            ✓ Your email has been added to the Viraasat Registry.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 pt-2 items-end">
            <div className="w-full">
              <Input
                type="email"
                placeholder="Enter your noble email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-[#FDFCFB]"
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              className="w-full sm:w-auto h-[46px] whitespace-nowrap"
            >
              Register
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
