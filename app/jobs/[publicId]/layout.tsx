import JobBoardNav from "@/components/spc/navbars/jobBoardNav";

export default async function JobBoardLayout({ children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <main>
      <JobBoardNav />
      <div>
        {children}
      </div>
    </main>
  );
}