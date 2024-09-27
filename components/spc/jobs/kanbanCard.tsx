import { applicant } from "@/types/startblock";

import ApplicantSlideOut from "./applicantSlideOut";
import UpdateApplicantScore from "./updateApplicantScore";

export default function KanbanCard({ applicant, setDragged }: { applicant: applicant, setDragged: Function }) {
  return (
    <ApplicantSlideOut applicant={applicant} key={applicant.id}>
      <div 
      onDrag={() => setDragged(applicant.id)}
      className="border border-our-gray p-4 hover:bg-white cursor-pointer transition-colors mb-4"
      draggable
      >
        <p className="text-xs text-our-gray">Name</p>
        <p>{applicant.answers[0].answer}</p>
        <p className="text-xs mt-4 text-our-gray">Email</p>
        <p>{applicant.answers[1].answer}</p>
        <p className="text-xs mt-4 mb-1 text-our-gray">Score</p>
        <UpdateApplicantScore value={applicant.score} applicationId={applicant.id} />
      </div>
    </ApplicantSlideOut>
  )
}