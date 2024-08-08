"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { signIn } from "next-auth/react";

import { checkIfEmailIsInUse } from "@/lib/auth";

import Input from "@/components/ui/input-field";
import ActionButton from "@/components/ui/action-button";

export default function SigninForm() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  const router = useRouter()

  async function handleSubmitEmail(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      await checkIfEmailIsInUse(email);
    } catch (error) {
      setLoading(false);
      return setError("Something went wrong, please try again later.");
    }

    const signin = await signIn("postmark", 
      {
        email: email,
        redirect: false
      },
    );

    if (signin?.error) {
      setLoading(false)
      return setError("Error sending verification code, please try again later.");
    }

    setLoading(false);

    return setStep(2);
  }

  async function handleSubmitVerificationCode(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const apiAuthVerificationResponse = await fetch("/api/auth/callback/postmark?&token="+code+"&email="+email)

    if (!apiAuthVerificationResponse.ok) {
      setLoading(false)
      return setError("Invalid verification code, please try again.")
    }

    return router.push("/dashboard")
  }

  return (
    <div className="h-screen justify-center items-center flex-col flex">
      <div className="w-96">
        <h1 className="text-4xl font-heading">Welcome to StartBlock</h1>
        <h3 className="text-lg mt-8 text-our-gray font-heading">We hope you're ready to be delighted by your simple, yet powerful ATS.</h3>
        {step === 1 && (
          <form 
          onSubmit={handleSubmitEmail}
          >
            <h3 className="mt-8 font-heading">Work Email</h3>
            <Input 
            type="email" 
            placeholder="Enter your work email address..." 
            name="email" 
            value={email}
            disabled={loading}
            onChange={(e) => setEmail(e.target.value)}
            required 
            className="mt-4"
            />
            <ActionButton
            type="submit"
            className="mt-8"
            disabled={loading}
            >
              Continue
            </ActionButton>
          </form>
        )}

        {step === 2 && (
          <form
          onSubmit={handleSubmitVerificationCode}
          >
            <h3 className="mt-8 font-heading">Verification Code</h3>
            <Input 
            type="text" 
            placeholder="Enter code sent to your email..." 
            name="email" 
            value={code}
            disabled={loading}
            onChange={(e) => setCode(e.target.value)}
            required 
            className="mt-4"
            />
            <ActionButton
            type="submit"
            className="mt-8"
            disabled={loading}
            >
              Continue
            </ActionButton>
          </form>
        )}

        {error && (
          <p className="text-red-500 fixed mt-4 mx-auto">{error}</p>
        )}
      </div>
    </div>
  );
};
