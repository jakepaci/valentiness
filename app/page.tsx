"use client";

import React, { useState } from "react";
import ValentineStep1 from "@/components/ValentineStep1";
import ValentineCaptcha from "@/components/ValentineCaptcha";
import ValentineSuccess from "@/components/ValentineSuccess";

type Step = "name" | "captcha" | "success";

export default function Home() {
  const [step, setStep] = useState<Step>("name");
  const [name, setName] = useState("");

  if (step === "name") {
    return (
      <ValentineStep1
        onNext={(enteredName) => {
          setName(enteredName);
          setStep("captcha");
        }}
      />
    );
  }

  if (step === "captcha") {
    return <ValentineCaptcha onVerify={() => setStep("success")} />;
  }

  return <ValentineSuccess name={name} />;
}
