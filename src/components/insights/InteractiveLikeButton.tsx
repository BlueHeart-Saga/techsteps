import React, { useState, useEffect } from "react";
import { insightsApi } from "../../lib/insightsApi";

interface InteractiveLikeButtonProps {
  postId: string;
  initialLikes?: number;
}

export default function InteractiveLikeButton({
  postId,
  initialLikes = 0,
}: InteractiveLikeButtonProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikes);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(`like_${postId}`) === "true";
      setLiked(stored);
    }
  }, [postId]);

  const handleToggleLike = async () => {
    if (isSubmitting) return;

    const nextState = !liked;
    setLiked(nextState);
    setLikeCount((prev) => (nextState ? prev + 1 : Math.max(0, prev - 1)));

    if (typeof window !== "undefined") {
      localStorage.setItem(`like_${postId}`, String(nextState));
    }

    try {
      setIsSubmitting(true);
      const res = await insightsApi.registerLike(postId);
      if (res && typeof res.likes === "number") {
        setLikeCount(res.likes);
      }
    } catch (err) {
      console.error("Failed to sync like with server:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <button
      onClick={handleToggleLike}
      disabled={isSubmitting}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-sm active:scale-95 ${
        liked
          ? "bg-rose-50 text-rose-600 border border-rose-200 shadow-rose-100"
          : "bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200"
      }`}
      aria-label={liked ? "Unlike this article" : "Like this article"}
      title={liked ? "Unlike publication" : "Like publication"}
    >
      <svg
        className={`w-4 h-4 transition-transform duration-200 ${
          liked ? "fill-rose-600 text-rose-600 scale-110" : "fill-none text-slate-500"
        }`}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
      <span>{likeCount} {likeCount === 1 ? "Like" : "Likes"}</span>
    </button>
  );
}
