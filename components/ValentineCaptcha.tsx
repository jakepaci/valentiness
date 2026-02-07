import React, { useState } from "react";
import Image from "next/image";
import { Check } from "lucide-react";

interface Props {
  onVerify: () => void;
}

// 9 placeholder images — replace with your own photos
const IMAGES = [
  { id: 0, src: "/img/img1.jpeg" },
  { id: 1, src: "/img/img2.jpeg" },
  { id: 2, src: "/img/img3.jpeg" },
  { id: 3, src: "/img/img4.jpeg" },
  { id: 4, src: "/img/img5.jpeg" },
  { id: 5, src: "/img/img6.jpeg" },
  { id: 6, src: "/img/img7.png" },
  { id: 7, src: "/img/img8.jpeg" },
  { id: 8, src: "/img/img9.jpeg" },
];

const ValentineCaptcha = ({ onVerify }: Props) => {
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [error, setError] = useState("");
  const [verifying, setVerifying] = useState(false);

  const toggle = (id: number) => {
    setError("");
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleVerify = () => {
    if (selected.size !== 9) {
      setError("Select ALL images with your Valentine 💕");
      return;
    }
    setVerifying(true);
    setTimeout(() => onVerify(), 1200);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-valentine-bg px-4">
      <div className="w-full max-w-[350px] animate-fade-in sm:max-w-[400px]">
        <div className="overflow-hidden rounded-sm border border-gray-300 bg-white shadow-lg">
          {/* Blue header — matches Google captcha */}
          <div className="bg-[#4A90D9] px-4 py-3">
            <p className="text-[13px] text-white leading-snug">
              Select all squares with
            </p>
            <p className="text-xl font-bold text-white leading-tight">
              your Valentine
            </p>
            <p className="mt-0.5 text-[11px] text-white/70">
              Click verify once there are none left
            </p>
          </div>

          {/* 3×3 Image grid */}
          <div className="grid grid-cols-3 gap-[2px] bg-gray-300 p-[2px]">
            {IMAGES.map((img) => (
              <button
                key={img.id}
                onClick={() => toggle(img.id)}
                className="relative aspect-square overflow-hidden focus:outline-none group bg-white"
              >
                <Image
                  src={img.src}
                  alt=""
                  fill
                  sizes="(max-width: 400px) 33vw, 133px"
                  quality={90}
                  className="object-cover"
                />
                {/* Selected overlay */}
                {selected.has(img.id) && (
                  <div className="absolute inset-0 border-[3px] border-[#4A90D9] bg-[#4A90D9]/15">
                    <div className="absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#4A90D9] shadow animate-scale-in">
                      <Check
                        className="h-3.5 w-3.5 text-white"
                        strokeWidth={3}
                      />
                    </div>
                  </div>
                )}
                {/* Hover */}
                {!selected.has(img.id) && (
                  <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
                )}
              </button>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-gray-200 px-3 py-3">
            <div className="flex items-center gap-3 text-gray-400">
              {/* Reload / headphones / info icons like real captcha */}
              <svg
                className="h-5 w-5 cursor-pointer hover:text-gray-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M1 4v6h6M23 20v-6h-6" />
                <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
              </svg>
              <svg
                className="h-5 w-5 cursor-pointer hover:text-gray-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
              </svg>
              <svg
                className="h-5 w-5 cursor-pointer hover:text-gray-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
            </div>

            <div className="flex items-center gap-2">
              {error && (
                <p className="text-[11px] text-red-500 max-w-[120px] leading-tight">
                  {error}
                </p>
              )}
              <button
                onClick={handleVerify}
                disabled={verifying}
                className="rounded bg-[#4A90D9] px-5 py-1.5 text-sm font-semibold uppercase tracking-wide text-white shadow transition-all hover:bg-[#3A7BC8] active:scale-[0.97] disabled:opacity-70"
              >
                {verifying ? (
                  <span className="flex items-center gap-2">
                    <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  </span>
                ) : (
                  "Verify"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValentineCaptcha;
