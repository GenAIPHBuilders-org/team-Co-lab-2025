"use client"

import { Coins, Flame, SidebarIcon, Store } from "lucide-react"
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

export function SiteHeader() {
  const { toggleSidebar } = useSidebar()

  return (
    <header className="fixed top-0 z-50 flex w-full items-center border-b border-b-[#60606030] bg-gradient-to-b from-gray-900 to-gray-950 shadow-sm backdrop-blur dark:border-slate-700">
      <div className="flex h-(--header-height) w-full items-center gap-2 px-4 justify-between">
        <div className="w-full flex items-center gap-2">
          <Button
            className="h-8 w-8"
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
          >
            <SidebarIcon />
          </Button>
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb className="hidden sm:block">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">
                  Building Your Application
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="px-12 flex items-center gap-4 space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
          >
            <Flame />
            0
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
          >
            <Coins />
            0
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 ml-4"
          >
            <Store />
            Shop
          </Button>
        </div>
      </div>
    </header>
  )
}
