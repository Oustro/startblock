"use client"

import { usePathname } from "next/navigation";

import TabLink from "@/components/ui/tab-link";

import { House, Settings, Shapes, ExternalLink } from 'lucide-react';

export default function SideDashboardNav({ publicId } : { publicId: string }) {
  return (
    <nav className="hidden sm:flex shadow-lg w-24 bg-white z-20 flex-col items-center h-screen pt-3 gap-4 fixed border-r border-our-gray">
      <TabLink 
      link="/dashboard" 
      activate={usePathname() === "/dashboard"} 
      label="Dashboard"
      >
        <House className="h-6 w-6" />
      </TabLink>
      <TabLink 
      link={`/jobs/${publicId}`} 
      activate={usePathname() === "/dashboard/applicants"} 
      label="Visit job board"
      >
        <ExternalLink className="h-6 w-6" />
      </TabLink>
      <TabLink 
      link="/dashboard/config" 
      activate={usePathname() === "/dashboard/config"} 
      label="Configuration"
      >
        <Shapes className="h-6 w-6" />
      </TabLink>
      <TabLink 
      link="/dashboard/settings" 
      activate={usePathname() === "/dashboard/settings"} 
      label="Settings"
      >
        <Settings className="h-6 w-6" />
      </TabLink>
      <div className="fixed bottom-4 text-center text-[11px] p-3 font-special">
        <p>"Do everything in love."</p>
        <p className="mt-2">1 Cor 16:14</p>
      </div>
    </nav>
  )
}