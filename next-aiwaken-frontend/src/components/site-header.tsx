"use client"

import { Coins, Flame, Heart, SidebarIcon, Store, Zap } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useSidebar } from "@/components/ui/sidebar"
import Link from "next/link"
import useBreadcrumbs from "@/hooks/use-breadcrumbs"
import React from "react"
import { Badge } from "./ui/badge"
import { DailyCheckInModal } from "./daily-check-in/daily-check-in"

export function SiteHeader() {
  const { toggleSidebar } = useSidebar()
  const breadcrumbs = useBreadcrumbs();

  if (!breadcrumbs) return null;

  return (
    <header className="fixed top-0 z-50 w-full border-b border-b-purple-200/40  bg-gradient-to-r from-slate-800 via-slate-800 to-slate-950 shadow-lg backdrop-blur-lg">
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent" />
      <div className="relative  flex h-16 w-full items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="h-9 w-9 text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
          >
            <SidebarIcon className="h-4 w-4" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>

          <Separator orientation="vertical" className="h-6 bg-white/20" />

          <Breadcrumb className="hidden sm:block">
            <BreadcrumbList>
              {breadcrumbs.map((crumb, idx) => (
                <React.Fragment key={crumb.href}>
                  <BreadcrumbItem>
                    {idx < breadcrumbs.length - 1 ? (
                      <BreadcrumbLink
                        href={crumb.href}
                        className="text-slate-400 hover:text-white transition-colors"
                      >
                        {crumb.label}
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage className="text-white font-medium">
                        {crumb.label}
                      </BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                  {idx < breadcrumbs.length - 1 && (
                    <BreadcrumbSeparator className="text-slate-500" />
                  )}
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="flex items-center gap-2 ml-24">
          <Link href="/dashboard/shop">
            <Button
              variant="ghost"
              className="h-9 px-3 text-slate-300 hover:bg-white/10 hover:text-white transition-all duration-200 hover:scale-105"
            >
              <Store className="h-4 w-4 " />
              <span className="hidden sm:inline">Shop</span>
            </Button>
          </Link>

          <Link href="/dashboard/daily-quest">
            <Button
              variant="ghost"
              className="h-9 px-3 text-slate-300 hover:bg-white/10 hover:text-white transition-all duration-200 hover:scale-105"
            >
              <Zap className="h-4 w-4 " />
              <span className="hidden sm:inline">Daily Quests</span>
            </Button>
          </Link>
          <DailyCheckInModal />
          <Badge className="hidden sm:inline bg-purple-500/10 text-purple-300 border-purple-500/20">
            <div className="flex items-center gap-1">
              <Zap className="h-4 w-4" />
              <span>Advance Mathematics</span>
            </div>
          </Badge>
        </div>

        <div className="hidden md:flex items-center   gap-6">
          <div className="flex items-center gap-4 w-full">
            <div className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-orange-500/20 to-red-500/20 px-3 py-1.5 border border-orange-500/30">
              <Flame className="h-4 w-4 text-orange-400" />
              <span className="text-sm font-semibold text-white">2</span>
              <span className="text-xs text-orange-300">Streak</span>
            </div>

            <div className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-yellow-500/20 to-amber-500/20 px-3 py-1.5 border border-yellow-500/30">
              <Coins className="h-4 w-4 text-yellow-400" />
              <span className="text-sm font-semibold text-white">324</span>
              <span className="text-xs text-yellow-300">Coins</span>
            </div>

            <div className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-red-500/20 to-red-500/20 px-3 py-1.5 border border-red-500/30">
              <Heart className="h-4 w-4 text-red-400" />
              <span className="text-sm font-semibold text-white">5</span>
              <span className="text-xs text-red-300">Heart</span>
            </div>
          </div>
        </div>

        <div className="md:hidden flex items-center gap-2 absolute right-6 top-1/2 -translate-y-1/2">
          <Button variant="ghost" size="sm" className="h-8 px-2 text-orange-400 hover:bg-orange-500/20">
            <Flame className="h-3 w-3 mr-1" />
            <span className="text-xs">0</span>
          </Button>
          <Button variant="ghost" size="sm" className="h-8 px-2 text-yellow-400 hover:bg-yellow-500/20">
            <Coins className="h-3 w-3 mr-1" />
            <span className="text-xs">0</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
