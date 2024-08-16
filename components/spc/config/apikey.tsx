"use client"

import { useState } from "react"

import ActionButton from "@/components/ui/action-button"

import { regeneratePublicId } from "@/lib/team";

export default function ApiKey({ publicId, teamId } : { publicId: string, teamId: string }) {
  const [key, setKey] = useState(publicId);

  const [loading, setLoading] = useState(false);

  async function regenerateKey() {
    setLoading(true);
    const newKey = await regeneratePublicId(teamId);
    setKey(newKey);
    setLoading(false);
  }

  return (
    <>
      <div className="w-full border border-our-gray py-6 px-8 mt-8">
        <h2 className="text-xl font-heading">Public API Key</h2>
        <p className="text-our-gray mt-2">This key unlocks the StartBlock API and SDK to be used on your own apps.</p>
        <h3 className="mt-6 text-lg font-heading">pk_{key}</h3>
      </div>  
      <div className="py-4 px-8 bg-white border-r border-l border-b border-our-gray flex justify-between items-center">
        <p className="text-our-gray text-sm w-full">Check out our documentation to use StartBlock in your apps.</p>
        <ActionButton 
        className="w-24"
        onClick={regenerateKey}
        disabled={loading}
        >
          Regenerate
        </ActionButton>
      </div>
    </>
  )
}