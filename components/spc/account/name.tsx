"use client"

import { useState } from "react"

import ActionButton from "@/components/ui/action-button"
import Input from "@/components/ui/input-field";

import { changeUserName } from "@/lib/auth";

import { useRouter } from "next/navigation";

export default function Name({ currName } : { currName: string }) {
  const [name, setName] = useState(currName);
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function changeName(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    await changeUserName(name);
    
    router.refresh();

    return setLoading(false);
  }

  return (
    <form
    onSubmit={changeName}
    >
      <div className="w-full border border-our-gray py-6 px-8 mt-8">
        <h2 className="text-xl font-heading">Your Name</h2>
        <p className="text-our-gray mt-2">This is the name of your account.</p>
        <Input
        name="userName"
        disabled={loading}
        className="w-full mt-6"
        placeholder="Enter your name..."
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