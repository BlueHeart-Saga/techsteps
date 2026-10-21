import React, { useState } from "react";
// If you still want to use the modal for category preferences, keep this import
// import CategoryPreferenceModal from "./CategoryPreferenceModal";

interface InlineNewsletterProps {
  categorySlug?: string;
  categoryName?: string;
  placeholder?: string;
  buttonText?: string;
}

export const InlineNewsletter: React.FC<InlineNewsletterProps> = ({
  categorySlug,
  categoryName,
  placeholder = "corporate.email@company.co.uk",
  buttonText = "Subscribe →",
}) => {
  const [email, setEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subscribedSuccess, setSubscribedSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!email || !email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);

    try {
      // UNGAL BACKEND API ENDPOINT INGA KUDUNGA
      // Example: /api/newsletter/subscribe
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          email,
          categorySlug: categorySlug || "global",
          categoryName: categoryName || "All Insights"
        }),
      });

      if (response.ok) {
        // Success
        setSubscribedSuccess(true);
        setEmail("");
      } else {
        // Server error
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || "Failed to subscribe. Please try again.");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  if (subscribedSuccess) {
    return (
      <div className="p-4 rounded-[12px] bg-emerald-50 border border-emerald-300 text-emerald-800 max-w-lg mx-auto flex items-center justify-center gap-2.5 animate-fadeIn font-sans">
        <svg className="w-5 h-5 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-sm font-semibold">Thank you for subscribing! You are now subscribed to TechSteps updates.</span>
      </div>
    );
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto font-sans">
        <label htmlFor={`inline-newsletter-${categorySlug || "global"}`} className="sr-only">
          Your corporate email address
        </label>
        <input
          id={`inline-newsletter-${categorySlug || "global"}`}
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          disabled={isLoading}
          className="flex-1 min-w-0 bg-white border border-slate-300 rounded-[8px] px-5 py-3.5 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#2D6A4F] focus:ring-2 focus:ring-[#2D6A4F]/20 shadow-xs transition-all disabled:opacity-70"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="shrink-0 bg-[#2D6A4F] hover:bg-[#245a41] text-white font-bold text-xs uppercase tracking-widest px-7 py-3.5 rounded-[12px] transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLoading ? "Subscribing..." : buttonText}
        </button>
      </form>

      {/* Error Message */}
      {error && (
        <p className="mt-3 text-sm text-red-600 text-center font-medium">
          {error}
        </p>
      )}

      {/* 
        CategoryPreferenceModal is removed from the submit flow. 
        If you still want to use it for something else, you can bring it back.
      */}
    </div>
  );
};

export default InlineNewsletter;