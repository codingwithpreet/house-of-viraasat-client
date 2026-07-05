import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      role="contentinfo"
      className="bg-[#1C1C1C] text-[#FDFCFB]/70 py-16 border-t border-[#C5A059]/20 font-sans"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Story Column */}
          <div className="space-y-4 md:col-span-1">
            <h3 className="font-serif text-sm tracking-[0.2em] text-[#C5A059] uppercase">
              House of Viraasat
            </h3>
            <p className="text-xs leading-relaxed text-[#FDFCFB]/50 max-w-sm">
              Established at the intersection of imperial Indian heritage and contemporary
              minimalism. Each garment in our legacy wardrobe represents a heirloom hand-tailored
              using pure raw silk and centuries-old gold wire work.
            </p>
          </div>

          {/* Collections Navigation Column */}
          <div className="space-y-4">
            <h3 className="font-serif text-sm tracking-[0.2em] text-[#C5A059] uppercase">
              Atelier Collections
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/products" className="hover:text-[#C5A059] transition-colors">
                  Royal Grooms Sherwanis
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-[#C5A059] transition-colors">
                  Celebration Kurta Sets
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-[#C5A059] transition-colors">
                  Tailored Jodhpuri Bandhgalas
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-[#C5A059] transition-colors">
                  Bespoke Bundi & Waistcoats
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service Navigation Column */}
          <div className="space-y-4">
            <h3 className="font-serif text-sm tracking-[0.2em] text-[#C5A059] uppercase">
              Client Services
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/account/profile" className="hover:text-[#C5A059] transition-colors">
                  Your Noble Account
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-[#C5A059] transition-colors">
                  Shopping Bag
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-[#C5A059] transition-colors">
                  Atelier Wishlist
                </Link>
              </li>
              <li>
                <span className="text-[#FDFCFB]/40">Bespoke Fit Consulting</span>
              </li>
            </ul>
          </div>

          {/* Newsletter / Subscription Column */}
          <div className="space-y-4">
            <h3 className="font-serif text-sm tracking-[0.2em] text-[#C5A059] uppercase">
              Join the Royal Sector
            </h3>
            <p className="text-xs text-[#FDFCFB]/50 leading-relaxed">
              Subscribe to receive private invitations to new collection drops, trunk shows, and
              ancestral textile journals.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex border-b border-[#FDFCFB]/30 pb-1 mt-2"
            >
              <input
                type="email"
                placeholder="Your noble email address..."
                className="bg-transparent border-none text-xs w-full focus:outline-none text-[#FDFCFB] placeholder-[#FDFCFB]/35"
                required
              />
              <button
                type="submit"
                className="text-xs uppercase tracking-widest text-[#C5A059] hover:text-[#FDFCFB] transition-colors px-2 cursor-pointer"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Bottom divider and legal copyright */}
        <div className="border-t border-[#FDFCFB]/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] tracking-wider uppercase text-[#FDFCFB]/40">
          <div>
            © {new Date().getFullYear()} House of Viraasat Private Limited. All royal rights
            reserved.
          </div>
          <div className="flex gap-6">
            <span>Heritage Tailoring</span>
            <span>Handloom Registry</span>
            <span>Craftsmen Guild</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
