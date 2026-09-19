import React, { useState } from "react";
import CategoryPreferenceModal from "./CategoryPreferenceModal";

export const FooterNewsletter: React.FC = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subscribedSuccess, setSubscribedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@") || !email.includes(".")) {
      return;
    }

    setIsModalOpen(true);
  };

  return (
    <div className="w-full text-center font-sans">

      {/* Newsletter Heading */}
      <h3 className="font-sans text-3xl sm:text-4xl font-medium text-white tracking-tight">
        Get Updates
      </h3>

      {/* Newsletter Description */}
      <p className="font-sans text-sm font-medium text-white mt-2 max-w-sm mx-auto leading-relaxed">
        Subscribe to our newsletter to receive regulatory updates, ITAD digests, and technical announcements.
      </p>

      {subscribedSuccess ? (
        <div className="mt-6 p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-white max-w-md mx-auto flex items-center justify-center gap-2.5 animate-fadeIn">
          <svg
            className="w-5 h-5 text-emerald-400 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0"
            />
          </svg>

          <span className="text-xs sm:text-sm font-semibold text-white">
            Thank you for subscribing! We&apos;ll keep you updated.
          </span>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="mt-6 max-w-md mx-auto space-y-3"
        >
          <div>
            <label htmlFor="footer-email" className="sr-only">
              Email address
            </label>

            <input
              id="footer-email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="*Email"
              className="w-full bg-transparent border border-white/60 rounded-xs px-3.5 py-2 text-sm text-white placeholder-white/80 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all font-sans"
            />
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="footer-name" className="sr-only">
              First Name
            </label>

            <input
              id="footer-name"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="*First Name"
              className="flex-1 min-w-0 bg-transparent border border-white/60 rounded-xs px-3.5 py-2 text-sm text-white placeholder-white/80 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all font-sans"
            />

            <button
              type="submit"
              className="bg-white hover:bg-neutral-100 text-[#0B0F0D] font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-xs transition-colors shadow-sm shrink-0 cursor-pointer font-sans"
            >
              Sign Up
            </button>
          </div>
        </form>
      )}

      {isModalOpen && (
        <CategoryPreferenceModal
          email={email}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => {
            setSubscribedSuccess(true);
            setEmail("");
            setName("");
          }}
        />
      )}
    </div>
  );
};

export default FooterNewsletter;