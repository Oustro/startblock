"use client"

import { useState } from "react"

import { useRouter } from "next/navigation";

import ActionButton from "@/components/ui/action-button"
import Input from "@/components/ui/input-field";

import { updateTeamName } from "@/lib/team";

export default function TeamName({ teamName, teamId } : { teamName: string, teamId: string }) {
  const [name, setName] = useState(teamName);

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleUpdatename(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    setLoading(true);
    await updateTeamName(teamId, name);
    setLoading(false);
    
    return router.refresh();
  }

  return (
    <form
    onSubmit={handleUpdatename}
    >
      <div className="w-full border border-our-gray py-6 px-8 mt-8">
        <h2 className="text-xl font-heading">Edit Team Name</h2>
        <p className="text-our-gray mt-2">This is the public name of the company or team hiring.</p>
        <Input
        name="teamName"
        disabled={loading}
        className="w-full mt-6"
        placeholder="Enter your team name..."
        type="text"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        />
      </div>  
      <div className="py-4 px-8 bg-white border-r border-l border-b border-our-gray flex justify-end items-center">
        <ActionButton 
        className="w-24"
        type="submit"
        disabled={loading}
        >
          Save Name
        </ActionButton>
      </div>
    </form>
  )
}