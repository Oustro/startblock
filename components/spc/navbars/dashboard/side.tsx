"use client"

import { usePathname } from "next/navigation";

import TabLink from "@/components/ui/tab-link";

import { Users, House, Settings, Shapes } from 'lucide-react';

export default function SideDashboardNav() {
  return (
    <nav className="w-24 bg-white flex flex-col items-center h-screen pt-8 gap-4 fixed">
      <TabLink 
      link="/dashboard" 
      activate={usePathname() === "/dashboard"} 
      label="Dashboard"
      >
        <House className="h-6 w-6" />
      </TabLink>
      <TabLink 
      link="/dashboard/applicants" 
      activate={usePathname() === "/dashboard/applicants"} 
      label="Applicant Pool"
      >
        <Users className="h-6 w-6" />
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
      <div className="fixed bottom-6 text-center text-xs p-2">
        <p>"Do everything in love."</p>
        <p className="mt-2">1 Cor 16:14</p>
      </div>
    </nav>
  )
}