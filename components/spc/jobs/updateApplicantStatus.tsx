"use client";

import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { updateApplicantStatus } from "@/lib/job";

export default function UpdateApplicantStatus({ value, applicationId } : { value: string, applicationId: string }) {
  const [loading, setLoading] = useState(false);

  const status = [
    "Interview",
    "Hired",
    "Rejected"
  ];

  async function updateStatus(status: string) {
    setLoading(true);
    
    await updateApplicantStatus(applicationId, status);

    return setLoading(false);
  }

  return (
    <Select
    defaultValue={value}
    disabled={loading}
    onValueChange={(value) => updateStatus(value)}
    >
      <SelectTrigger
      className="rounded-none bg-transparent w-fit gap-4 border-our-gray text-sm"
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
          {status.map((status) => (
            <SelectItem 
            key={status} 
            value={status}
            >
              {status}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  )
}