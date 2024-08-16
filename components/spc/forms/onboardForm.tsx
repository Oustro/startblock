"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { onboardUserStepOne, onboardUserStepTwo } from "@/lib/onboarding";
import { createTeam } from "@/lib/team";

import Input from "@/components/ui/input-field";
import ActionButton from "@/components/ui/action-button";
import ActionWord from "@/components/ui/action-word";

export default function OnboardForm() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [teamName, setTeamName] = useState("");

  const router = useRouter();

  async function handleUpdateUser(step: number) {
    if (step === 1) {
      await onboardUserStepOne(name);
    }
    else if (step === 2) {
      await onboardUserStepTwo();
    }
  }

  async function handleSubmitCreateTeam(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); 
    setLoading(true);
    setError("");

    await handleUpdateUser(1);
    
    await createTeam(teamName);

    await handleUpdateUser(2);

    return router.push("/dashboard")
  }


  return (
    <div className="h-screen justify-center items-center flex-col flex">
      <div className="w-96">
        {step === 1 && (
          <form 
          onSubmit={() => setStep(2)}
          >
            <h1 className="text-3xl font-heading">Let's set up your account</h1>
            <h3 className="mt-8 font-heading">Your Name</h3>
            <Input 
            type="text" 
            placeholder="Enter your full name..." 
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="email" 
            disabled={loading}
            required 
            className="mt-3"
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
          <div>
            <h1 className="text-3xl font-heading">How do you want to use StartBlock?</h1>
            <div className="text-center">
              <ActionButton
              type="button"
              onClick={() => setStep(3)}
              disabled={loading}
              className="mt-8"
              >
                I want to set up a new team
              </ActionButton>
              <ActionWord
              className="mt-8"
              type="button"
              disabled={loading}
              onClick={() => setStep(4)}
              >
                I want to join an existing team
              </ActionWord>
            </div>
          </div>
        )}

        {step === 3 && (
          <form
          onSubmit={handleSubmitCreateTeam}
          >
            <h1 className="text-3xl font-heading">Create a new team</h1>
            <h3 className="mt-8 font-heading">Team Name</h3>
            <Input
            type="text"
            placeholder="Enter your team name..."
            name="teamName"
            disabled={loading}
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            required
            className="mt-3"
            />
            <ActionButton
            type="submit"
            disabled={loading}
            className="mt-8"
            >
              Continue
            </ActionButton>
            <ActionWord
            className="mt-8"
            type="button"
            onClick={() => setStep(4)}
            >
              I want to join an existing team
            </ActionWord>
          </form>
        )}

        {step === 4 && (
          <form>
            <h1 className="text-3xl font-heading">Join an existing team</h1>
            <h3 className="mt-8 font-heading">Team Share Code</h3>
            <Input
            type="text"
            placeholder="Enter your team name..."
            name="teamName"
            required
            className="mt-3"
            />
            <ActionButton
            type="submit"
            className="mt-8"
            >
              Continue
            </ActionButton>
            <ActionWord
            className="mt-8"
            type="button"
            onClick={() => setStep(3)}
            >
              I want to set up a new team
            </ActionWord>
          </form>
        )}
      </div>
    </div>
  );
};
