import { auth } from "@/utils/auth"

export default async function Home() {
  const session = await auth()

  return (
    <main>
      <p className="font-special text-4xl">The Delightfully Simple ATS</p>

      <p className="mt-4">Matter is the easiest to set up most powerful ATS that gives teams the upperhand when it comes to hiring the best candidates, because the ATS you use matters. </p>
    </main>
  );
}
