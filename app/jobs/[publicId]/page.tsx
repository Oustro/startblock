import { getJobs } from '@/lib/public';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import ApplyForm from '@/components/spc/forms/applyForm';
import { questions } from '@/types/startblock';

export default async function Jobpage({ params } : { params: { publicId: string } }) {
  const jobs = await getJobs(params.publicId);

  if (!jobs[0]?.team.activated || !jobs) {
    return (
      <main className='flex flex-col h-screen w-fit mx-8 sm:mx-auto justify-center text-left'>        
        <h1 className='font-special text-xl'>Unfortunately, this job board is not available.</h1>
        <h1 className='mt-4 text-our-gray'>Please check back again soon.</h1>
      </main>
    )
  }

  return (
    <main className='sm:w-[700px] mx-8 sm:mx-auto my-24 sm:my-8'>
      <h1 className='font-heading text-3xl'>Careers at {jobs[0]?.team.name}</h1>
      <Accordion
      type="single" 
      collapsible
      className='border-our-gray mt-12'
      >
        {jobs.map((job) => (
          <AccordionItem 
          key={job.id} 
          value={job.id}
          className='border-our-gray'
          >
            <AccordionTrigger>
              <div className='text-left'>
                <h3 className='text-lg font-heading'>{job.title}</h3>
                <p className='text-our-gray'>{job.location}</p>
                <p className='text-our-gray'>${job.salary}</p>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <h4 className='text-lg font-heading'>Description</h4>
              <p className='whitespace-pre-wrap mt-2'>{job.description}</p>
              <h4 className='text-lg font-heading mt-8'>Requirements</h4>
              <p className='whitespace-pre-wrap mt-2'>{job.requirements}</p>

              <ApplyForm
              questions={job.questions as unknown as questions[]}
              className='mt-8'
              jobId={job.id}
              />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </main>
  );
}
