"use client";
import { Share2 } from "lucide-react";
import { useUserStore } from "@/store/userStore";
import { CountryData } from "@/types/country";

interface Props {
  countryData: CountryData | null;
  type?: "journey" | "quiz" | "countdown";
  score?: number;
  total?: number;
}

export default function ShareButton({ countryData, type = "journey", score, total }: Props) {
  const { selectedState } = useUserStore();

  const getMessage = () => {
    const baseUrl = "Check out voteguide.app";
    const country = countryData?.name || "my country";
    const date = countryData?.phases[0]?.date || "election day";
    const location = selectedState ? `in ${selectedState}` : `in ${country}`;

    if (type === "quiz") {
      return `🗳️ I just scored ${score}/${total} on the VoteGuide Civic Quiz! Can you beat me? ${baseUrl}`;
    }

    if (type === "countdown") {
      return `🕒 I'm counting down to election day ${location}. Join me! ${baseUrl}`;
    }

    return `I'm ready to vote on ${date} ${location}. Are you? ${baseUrl}`;
  };

  const handleShare = async () => {
    const message = getMessage();
    const shareData = {
      title: "VoteGuide",
      text: message,
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
        }
      }
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
    }
  };

  return (
    <button onClick={handleShare} className="btn-primary flex items-center gap-2">
      <Share2 size={18} />
      <span>Share</span>
    </button>
  );
}
