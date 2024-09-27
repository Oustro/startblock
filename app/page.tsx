import LogoNav from "@/components/spc/navbars/logoNav";
import ActionButton from "@/components/ui/action-button";
import ActionWord from "@/components/ui/action-word";
import Footer from "@/components/ui/footer";
import Video from "@/components/ui/video";

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
      <Link target="_blank" href="https://cal.com/ziggy/15min">
        <ActionWord className="w-30 mt-8 ml-4">
          Schedule a demo
        </ActionWord>
      </Link>
      <Video />
      <p className="mt-8 text-our-gray text-sm font-highlight">Application for</p>
      <h1 className='font-heading text-3xl'>StartBlock Partner</h1>
      <p className="mt-5 text-our-gray text-sm font-highlight">Location</p>
      <h3 className="text-lg flex items-center gap-2">Earth (Remote available)</h3>
      <p className="mt-5 text-our-gray text-sm font-highlight">Cost</p>
      <h3 className="text-lg">$10 / mo</h3>
      <h3 className="mt-8 text-our-gray text-sm font-highlight">Job description</h3>
      <p className="mt-2">No gimmicks, no frills.</p>
      <p className="mt-5">StartBlock is a feature conscious ATS that focuses on providing you and your applicants the best and most straightforward experience possible.</p>
      <p className="mt-5">Post unlimited jobs, collaborate with any sized team, sort and score applicants, and hire the best talent.</p>
      <p className="mt-5">Join today for only $10 / mo and cancel anytime.</p>
      <h3 className="mt-8 text-our-gray text-sm font-highlight">Requirements for applicants</h3>
      <p className="mt-2">Is operating startup or small business that is looking to hire talent.</p>
      <p className="mt-3">Wants simplicity and a delightful experience for themselves and applicants.</p>
      <p className="mt-3">Is hiring talent online through the custom StartBlock job board or using the StartBlock Embed SDK.</p>
      <p className="mt-3">Doesn't want to spend a fortune on an ATS or has a limited budget.</p>
      <Link href="/signin">
        <ActionButton className="mt-12">
          Start hiring with StartBlock
        </ActionButton>
      </Link>
      <Footer />
    </main>
  );
}
