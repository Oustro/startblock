
import { getJob } from '@/lib/public';
import ApplyForm from '@/components/spc/forms/applyForm';
import { questions } from '@/types/startblock';

export default async function Job({ params } : { params: { publicId: string, jobId: string } }) {
  const job = await getJob(params.jobId);

  if (!job?.team.activated || !job) {
    return (
      <main className='flex flex-col h-screen w-fit mx-auto justify-center text-left'>
        <h1 className='font-special text-xl'>Unfortunately, this job is not available.</h1>
        <h1 className='mt-4 text-our-gray'>Please check back again soon.</h1>
      </main>
    )
  }

  return (
     <main className='w-[700px] mx-auto my-8'>
        <h1 className='font-heading text-3xl'>{job?.title} at {job?.team.name}</h1>
        <h3 className="text-lg mt-4">{job?.location}</h3>
        <h3 className="text-lg mt-4">${job?.salary}</h3>
        <h3 className="mt-8 font-heading text-lg">Description</h3>
        <p className="mt-2 whitespace-pre-wrap">{job?.description}</p>
        <h3 className="mt-8 font-heading text-lg">Requirements</h3>
        <p className="mt-2 whitespace-pre-wrap">{job?.requirements}</p>
        <ApplyForm
        questions={job?.questions as unknown as questions[]}
        className='mt-8'
        jobId={job?.id as string}
        />
     </main>
  )
}