"use client";

import { useState } from "react";

import { updateApplicantScore } from "@/lib/job";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function UpdateApplicantScore({ value, applicationId } : { value: string | null | undefined, applicationId: string }) {
  const [loading, setLoading] = useState(false);
  
  const scores = [
    "Weak Candidate",
    "Below Average Candidate",
    "Above Average Candidate",
    "Strong Candidate",
  ];

  async function updateScore(score: string) {
    setLoading(true);

    await updateApplicantScore(applicationId, score);
    
    return setLoading(false);
  }

  return (
    <Select
    defaultValue={value || ""}
    disabled={loading}
    onValueChange={(value) => updateScore(value)}
    >
      <SelectTrigger
      className="rounded-none bg-transparent w-fit gap-4 border-our-gray text-sm"
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
          {scores.map((score) => (
            <SelectItem 
            key={score} 
            value={score}
            >
              {score}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  )
}