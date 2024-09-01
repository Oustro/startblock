import LogoNav from "@/components/spc/navbars/logoNav";
import ActionButton from "@/components/ui/action-button";

import Link from "next/link";

export default async function Home() {

  return (       
    <main className='sm:w-[700px] mx-8 sm:mx-auto my-24 sm:my-8'>
      <LogoNav />
      <h1 className='font-special text-4xl'>The delightfully simple and affordable ATS for startups.</h1>
      <Link href="/signin">
        <ActionButton className="w-20 mt-8">
          Sign in
        </ActionButton>
      </Link>
      <h1 className='font-heading mt-8 text-3xl'>Hiring startups using StartBlock.</h1>
      <h3 className="text-lg mt-4 flex items-center gap-2">Earth or Remote</h3>
      <h3 className="text-lg mt-4">$10 / mo</h3>
      <h3 className="mt-8 font-heading text-lg">Description</h3>
      <p className="mt-2 whitespace-pre-wrap">No gimmicks, no frills.</p>
      <p className="mt-5">StartBlock is a feature conscious ATS that does what your startup needs for only $10 / mo.</p>
      <p className="mt-5">Post unlimited jobs, collaborate with your team (no member limits), sort and score applicants, and hire the best talent.</p>
      <h3 className="mt-8 font-heading text-lg">Requirements</h3>
      <p className="mt-2">- Startup or small business.</p>
      <p className="mt-3">- Wants simplicity and a delightful experience for themselves and applicants.</p>
      <p className="mt-3">- Hiring talent online through your custom job board on StartBlock or embedded forms on your own site.</p>
      <p className="mt-3">- Don't want to spend a fortune on an ATS or have a limited budget.</p>
      <Link href="/signin">
        <ActionButton className="mt-6">
          Start hiring with StartBlock
        </ActionButton>
      </Link>
    </main>
  );
}
