import React, { useState } from "react";

interface Props {
  onNext: (name: string) => void;
}

const ValentineStep1 = ({ onNext }: Props) => {
  const [name, setName] = useState("");
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheck = () => {
    if (!name.trim()) {
      setError("Please enter your name first");
      return;
    }
    if (checked || loading) return;
    setError("");
    setLoading(true);
    // Simulate captcha verification loading
    setTimeout(() => {
      setLoading(false);
      setChecked(true);
      // After "verified", move to image captcha
      setTimeout(() => onNext(name.trim()), 800);
    }, 2000);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-valentine-bg px-4 gap-6">
      {/* Name input */}
      <div className="w-full max-w-xs">
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError("");
          }}
          placeholder="Enter your name"
          maxLength={100}
          className="w-full rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
        {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
      </div>

      {/* reCAPTCHA-style box */}
      <div className="w-full max-w-xs rounded-sm border border-gray-300 bg-[#f9f9f9] shadow-sm">
        <div className="flex items-center justify-between px-3 py-3">
          {/* Left: checkbox + label */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleCheck}
              disabled={loading || checked}
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm border-2 border-gray-300 bg-white transition-all hover:border-gray-400 disabled:cursor-default"
              aria-label="I'm not a robot"
            >
              {loading && (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
              )}
              {checked && (
                <svg
                  className="h-5 w-5 text-green-500 animate-scale-in"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </button>
            <span className="text-sm font-semibold text-black select-none">
              I'm not a robot
            </span>
          </div>

          {/* Right: reCAPTCHA branding */}
          <div className="flex flex-col items-center gap-0.5">
            <img src="/recaptcha-logo.png" alt="reCAPTCHA" width={32} height={32} className="opacity-80" />
            <span className="text-[10px] font-medium text-gray-400 tracking-tight">
              reCAPTCHA
            </span>
            <span className="text-[8px] text-gray-400">Privacy - Terms</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValentineStep1;
