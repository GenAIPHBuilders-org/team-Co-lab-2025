"use client";

import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { motion } from "framer-motion";

export default function DashboardLoading() {
  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <SiteHeader />
        </motion.div>
        <div className="flex flex-1">
          <SidebarInset>
            <div className="flex items-center justify-center h-full">
              <p className="text-slate-300">Loading...</p>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}