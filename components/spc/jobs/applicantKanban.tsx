"use client";

import { applicant } from "@/types/startblock";
import { useState } from "react";

import { useRouter } from "next/navigation";

import { updateApplicantStatus } from "@/lib/job";

import KanbanCard from "./kanbanCard";

export default function ApplicantKanban({ applicants }: { applicants?: [applicant[], applicant[], applicant[], applicant[]] }) {
  const [dragged, setDragged] = useState<string>("");
  const [hoveringApplied, setHoveringApplied] = useState<boolean>(false);
  const [hoveringInterview, setHoveringInterview] = useState<boolean>(false);
  const [hoveringHired, setHoveringHired] = useState<boolean>(false);
  const [hoveringRejected, setHoveringRejected] = useState<boolean>(false);

  const router = useRouter();

  async function handleDrop(newColumnStatus: string) {
    if (!dragged) {
      return;
    }

    await updateApplicantStatus(dragged, newColumnStatus);

    return router.refresh();
  }

  return (
    <div>
      <div className="mt-8 grid grid-cols-4 gap-3 px-4 border-b pb-3 border-our-gray">
        <p className="text-sm font-semibold text-our-gray">Applied</p>
        <p className="text-sm font-semibold text-our-gray">Interview</p>
        <p className="text-sm font-semibold text-our-gray">Hired</p>
        <p className="text-sm font-semibold text-our-gray">Rejected</p>
      </div>
      {applicants ? (
        <div className="grid grid-cols-4 gap-3">
            <div
            className={`px-1 py-4 ${hoveringApplied ? "bg-white" : ""} transition-colors`}
            onDragOver={(e) => {
              e.preventDefault();
              setHoveringApplied(true);
            }}
            onDragLeave={() => {
              setHoveringApplied(false)
            }}
            onDrop={() => {
              handleDrop("Applied");
              setHoveringApplied(false);
            }}
            >
            {applicants[0].map((applicant) => (
              <KanbanCard 
              key={applicant.id}
              applicant={applicant} 
              setDragged={setDragged} 
              />
            ))}
            </div>

          <div
          className={`px-1 py-4 ${hoveringInterview ? "bg-white" : ""} transition-colors`}
            onDragOver={(e) => {
              e.preventDefault();
              setHoveringInterview(true);
            }}
            onDragLeave={() => {
              setHoveringInterview(false)
            }}
            onDrop={() => {
              handleDrop("Interview");
              setHoveringInterview(false);
            }}
          >
            {applicants[1].map((applicant) => (
              <KanbanCard 
              key={applicant.id}
              applicant={applicant} 
              setDragged={setDragged} 
              />
            ))}
          </div>

          <div
          className={`px-1 py-4 ${hoveringHired ? "bg-white" : ""} transition-colors`}
          onDragOver={(e) => {
            e.preventDefault();
            setHoveringHired(true);
          }}
          onDragLeave={() => {
            setHoveringHired(false)
          }}
          onDrop={() => {
            handleDrop("Hired");
            setHoveringHired(false);
          }}
          >
            {applicants[2].map((applicant) => (
              <KanbanCard 
              key={applicant.id}
              applicant={applicant} 
              setDragged={setDragged} 
              />
            ))}
          </div>

          <div
          className={`px-1 py-4 ${hoveringRejected ? "bg-red-200" : ""} transition-colors`}
          onDragOver={(e) => {
            e.preventDefault();
            setHoveringRejected(true);
          }}
          onDragLeave={() => {
            setHoveringRejected(false)
          }}
          onDrop={() => {
            handleDrop("Rejected");
            setHoveringRejected(false);
          }}
          >
            {applicants[3].map((applicant) => (
              <KanbanCard 
              key={applicant.id}
              applicant={applicant} 
              setDragged={setDragged} 
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center mt-4 text-sm">No applicants found.</div>
      )}
    </div>
  )
}
