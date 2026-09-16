import React, { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { insightsApi } from "../../lib/insightsApi";

interface CategoryPreferenceModalProps {
  email: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  initialCategorySlug?: string;
}

export const CategoryPreferenceModal: React.FC<CategoryPreferenceModalProps> = ({
  email,
  isOpen,
  onClose,
  onSuccess,
  initialCategorySlug,
}) => {
  const [sections, setSections] = useState<any[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error" | "info";
    text: string;
  } | null>(null);

  const loadCategories = useCallback(async () => {
    if (!email) return;
    try {
      setDataLoading(true);
      setStatusMessage(null);

      // 1. Fetch user existing preferences (if any)
      const prefs = await insightsApi.getSubscriberPreferences(email).catch(() => null);
      const existingCats: string[] = (prefs?.categories || []).map((c: string) =>
        c.toLowerCase().trim()
      );

      // 2. Fetch all sections & categories for TechSteps
      const sectionsRes = await insightsApi.getSections();
      const sectionsList = sectionsRes?.sections || sectionsRes || [];

      const fullSections = await Promise.all(
        sectionsList.map(async (sec: any) => {
          try {
            const catRes = await insightsApi.getCategories(sec.slug);
            return {
              ...sec,
              categories: catRes?.categories || [],
            };
          } catch {
            return { ...sec, categories: [] };
          }
        })
      );

      setSections(fullSections);

      // 3. Pre-select initialCategorySlug if provided, or existing preferences
      const initialSet = new Set<string>(existingCats);
      if (initialCategorySlug) {
        initialSet.add(initialCategorySlug.toLowerCase().trim());
      }

      // If user had no previous selections and no initial category, select all categories by default for high engagement
      if (initialSet.size === 0) {
        fullSections.forEach((s) => {
          (s.categories || []).forEach((c: any) => {
            if (c.slug) initialSet.add(c.slug.toLowerCase().trim());
          });
        });
      }

      setSelectedCategories(Array.from(initialSet));
    } catch (err) {
      console.error("Error loading categories for subscription:", err);
      setStatusMessage({
        type: "error",
        text: "Unable to load topic categories. Please try again.",
      });
    } finally {
      setDataLoading(false);
    }
  }, [email, initialCategorySlug]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      loadCategories();
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "unset";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen, loadCategories, onClose]);

  const toggleCategory = (slug: string) => {
    const normalized = slug.toLowerCase().trim();
    setSelectedCategories((prev) => {
      if (prev.includes(normalized)) {
        return prev.filter((c) => c !== normalized);
      }
      return [...prev, normalized];
    });
  };

  const selectAllInSection = (categories: any[]) => {
    const slugs = categories.map((c: any) => c.slug.toLowerCase().trim());
    const allSelected = slugs.every((s: string) => selectedCategories.includes(s));

    if (allSelected) {
      // Deselect these
      setSelectedCategories((prev) => prev.filter((c) => !slugs.includes(c)));
    } else {
      // Add missing
      setSelectedCategories((prev) => Array.from(new Set([...prev, ...slugs])));
    }
  };

  const handleSubscribe = async () => {
    if (!email || !email.includes("@") || !email.includes(".")) {
      setStatusMessage({
        type: "error",
        text: "Please enter a valid corporate email address.",
      });
      return;
    }

    if (selectedCategories.length === 0) {
      setStatusMessage({
        type: "info",
        text: "Please choose at least one topic of interest.",
      });
      return;
    }

    try {
      setLoading(true);
      setStatusMessage(null);

      await insightsApi.subscribe(email, [], selectedCategories);

      setStatusMessage({
        type: "success",
        text: "You are now subscribed to TechSteps updates!",
      });

      if (onSuccess) onSuccess();

      setTimeout(() => {
        onClose();
      }, 1800);
    } catch (err: any) {
      const errorMsg = err.message || "Failed to update subscription. Please try again.";
      if (errorMsg.toLowerCase().includes("already interested")) {
        setStatusMessage({
          type: "success",
          text: "Your subscription preferences are already up to date.",
        });
        setTimeout(() => {
          onClose();
        }, 1800);
      } else {
        setStatusMessage({
          type: "error",
          text: errorMsg,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[999999] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="relative w-full max-w-xl max-h-[90vh] bg-[#12221A] border border-emerald-500/20 rounded-2xl sm:rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden animate-slideUp text-white font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Decorative Gradient Line */}
        <div className="h-1.5 w-full bg-gradient-to-r from-emerald-600 via-emerald-400 to-emerald-600" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 h-9 w-9 rounded-full bg-white/5 hover:bg-emerald-500 hover:text-white border border-white/10 flex items-center justify-center text-slate-300 transition-all duration-200 cursor-pointer z-10"
          aria-label="Close dialog"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal Header */}
        <div className="pt-6 sm:pt-8 px-6 sm:px-8 pb-4 text-center border-b border-white/5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-widest uppercase mb-3">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>Preferences</span>
          </div>
          <h3 id="modal-title" className="text-xl sm:text-2xl font-bold tracking-tight text-white font-serif">
            Personalize Your Technical Digest
          </h3>
          <p className="text-xs sm:text-sm text-slate-300/80 mt-1.5 max-w-md mx-auto">
            Choose which sectors and compliance frameworks you wish to receive updates on for{" "}
            <span className="text-emerald-300 font-semibold">{email}</span>.
          </p>
        </div>

        {/* Modal Body / Topic Checkboxes */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-5 space-y-6 custom-scrollbar">
          {dataLoading ? (
            <div className="flex flex-col items-center justify-center py-12 gap-3 text-slate-400">
              <div className="w-8 h-8 rounded-full border-2 border-emerald-500/20 border-t-emerald-400 animate-spin" />
              <span className="text-xs font-medium tracking-wide">Loading topic categories...</span>
            </div>
          ) : sections.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-sm">
              <p>General TechSteps Regulatory Updates</p>
            </div>
          ) : (
            sections.map((section) => {
              const secCategories = section.categories || [];
              if (secCategories.length === 0) return null;

              const slugs = secCategories.map((c: any) => c.slug.toLowerCase().trim());
              const allSelected = slugs.every((s: string) => selectedCategories.includes(s));

              return (
                <div key={section.slug} className="space-y-2.5">
                  <div className="flex items-center justify-between pb-1 border-b border-white/5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400/90">
                      {section.name}
                    </h4>
                    <button
                      type="button"
                      onClick={() => selectAllInSection(secCategories)}
                      className="text-[11px] font-semibold text-slate-400 hover:text-white transition-colors"
                    >
                      {allSelected ? "Deselect All" : "Select All"}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {secCategories.map((cat: any) => {
                      const isSelected = selectedCategories.includes(cat.slug.toLowerCase().trim());
                      return (
                        <label
                          key={cat.slug}
                          className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 cursor-pointer select-none ${
                            isSelected
                              ? "bg-emerald-950/60 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.12)] text-white"
                              : "bg-white/[0.03] border-white/10 hover:bg-white/[0.06] hover:border-white/20 text-slate-300"
                          }`}
                        >
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={isSelected}
                            onChange={() => toggleCategory(cat.slug)}
                          />
                          <div
                            className={`w-4 h-4 rounded flex items-center justify-center transition-all ${
                              isSelected
                                ? "bg-emerald-500 text-black shadow-sm"
                                : "border border-white/30 bg-black/40"
                            }`}
                          >
                            {isSelected && (
                              <svg className="w-3 h-3 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="3.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          <span className="text-xs font-medium leading-snug">{cat.name}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}

          {/* Status Message */}
          {statusMessage && (
            <div
              className={`p-3.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 animate-fadeIn ${
                statusMessage.type === "success"
                  ? "bg-emerald-500/15 border border-emerald-500/40 text-emerald-300"
                  : statusMessage.type === "error"
                  ? "bg-rose-500/15 border border-rose-500/40 text-rose-300"
                  : "bg-amber-500/15 border border-amber-500/40 text-amber-300"
              }`}
            >
              {statusMessage.type === "success" ? (
                <svg className="w-4 h-4 shrink-0 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              )}
              <span>{statusMessage.text}</span>
            </div>
          )}
        </div>

        {/* Modal Actions */}
        <div className="p-4 sm:p-6 bg-[#0E1A14] border-t border-white/5 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 text-slate-300 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
          >
            Maybe Later
          </button>
          <button
            type="button"
            onClick={handleSubscribe}
            disabled={loading || dataLoading}
            className="flex-1 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed text-black text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-xl transition-all shadow-[0_4px_15px_rgba(16,185,129,0.3)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.45)] cursor-pointer flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-3.5 h-3.5 rounded-full border-2 border-black/20 border-t-black animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <span>Save &amp; Subscribe</span>
            )}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default CategoryPreferenceModal;
