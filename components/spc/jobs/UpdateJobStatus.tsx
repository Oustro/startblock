"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

import { updateJobStatus } from "@/lib/job";

export default function UpdateJobStatus({ jobId, currStatus } : { jobId: string, currStatus: string }) {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function updateStatus(e: React.MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    setLoading(true);

    await updateJobStatus(jobId, currStatus === "Active" ? "Archived" : "Active");
    
    router.refresh();
    return setLoading(false);
  }


  return (
    <DropdownMenuItem
    disabled={loading}
    className="z-50"
    onClick={updateStatus}
    >
      {currStatus === "Active" ? "Archive" : "Unarchive"}
    </DropdownMenuItem>
  )
}