"use client"

import { useState } from "react"

import ActionButton from "@/components/ui/action-button"

export default function WhiteList({ teamId } : { teamId: string }) {


  return (
    <>
      <div className="w-full border border-our-gray py-6 px-8 mt-8">
        <h2 className="text-xl font-heading">Allowed Origins</h2>
        <p className="text-our-gray mt-2">This key unlocks the StartBlock API and SDK to be used on your own apps.</p>
        <h3 className="mt-6 text-lg font-heading">pk_</h3>
      </div>  
      <div className="py-4 px-8 bg-white border-r border-l border-b border-our-gray flex justify-between items-center">
        <p className="text-our-gray text-sm w-full">Check out our documentation to use StartBlock in your apps.</p>
        <ActionButton 
        className="w-24"
        >
          Regenerate
        </ActionButton>
      </div>
    </>
  )
}