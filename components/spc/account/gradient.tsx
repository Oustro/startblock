"use client"

import { useState } from "react"

import ActionButton from "@/components/ui/action-button"

import { createGradient } from "@/lib/utils";
import { changeUserGradient } from "@/lib/auth";

import { useRouter } from "next/navigation";

export default function Gradient({ currGradient } : { currGradient: string }) {
  const [gradient, setGradient] = useState(currGradient);
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function changeGradient() {

    setLoading(true);

    const newGradient = createGradient();

    changeUserGradient(newGradient);

    setGradient(newGradient);
    
    router.refresh();

    return setLoading(false);
  }

  return (
    <>
      <div className="w-full border border-our-gray py-6 px-8 mt-8">
        <h2 className="text-xl font-heading">Your Public Icon</h2>
        <p className="text-our-gray mt-2">This is the public profile icon on StartBlock.</p>
        <div 
        className="h-24 w-24 border border-our-gray mt-6 rounded-full"
        style={{background: gradient}}
        />
      </div>  
      <div className="py-4 px-8 bg-white border-r border-l border-b border-our-gray flex justify-end items-center">
        <ActionButton 
        className="w-24"
        type="submit"
        disabled={loading}
        onClick={changeGradient}
        >
          Regenerate
        </ActionButton>
      </div>
    </>
  )
}