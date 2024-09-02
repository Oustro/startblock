
import { getJob } from '@/lib/public';
import ApplyForm from '@/components/spc/forms/applyForm';
import { questions } from '@/types/startblock';

export default async function Job({ params } : { params: { publicId: string, jobId: string } }) {
  const job = await getJob(params.jobId);

  if (!job?.team.activated || !job) {
    return (
      <main className='flex flex-col h-screen w-fit mx-8 sm:mx-auto justify-center text-left'>        
        <h1 className='font-special text-xl'>Unfortunately, this job is not available.</h1>
        <h1 className='mt-4 text-our-gray'>Please check back again soon.</h1>
      </main>
    )
  }

  return (
     <main className='sm:w-[700px] mx-8 sm:mx-auto my-24 sm:my-8 text-lg'>
        <p className="mt-8 text-our-gray text-sm font-highlight">{job.team.name}'s Application for</p>
        <h1 className='font-heading text-3xl'>{job?.title}</h1>
        <p className="mt-5 text-our-gray text-sm font-highlight">Location</p>
        <h3>{job?.location}</h3>
        <p className="mt-5 text-our-gray text-sm font-highlight">Salary</p>
        <h3>${job?.salary}</h3>
        <p className="mt-5 text-our-gray text-sm font-highlight">Job description</p>
        <p className="whitespace-pre-wrap mt-2">{job?.description}</p>
        <h3 className="mt-8 text-our-gray text-sm font-highlight">Requirements for applicants</h3>
        <p className="mt-2 whitespace-pre-wrap">{job?.requirements}</p>
        <ApplyForm
        questions={job?.questions as unknown as questions[]}
        className='mt-8 text-sm'
        jobId={job?.id as string}
        />
     </main>
  )
}