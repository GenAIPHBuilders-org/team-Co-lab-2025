"use client"

import * as React from "react"
import {
  SquareTerminal,
} from "lucide-react"
import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { AIWakenIcon } from "./icons/aiwaken-icon"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Playground",
      url: "/dashboard",
      icon: SquareTerminal,
      isActive: true,
    },
    // {
    //   title: "Leaderboard",
    //   url: "/dashboard/leaderboard",
    //   icon: Sparkles,
    // },
    // {
    //   title: "Refer a Friend",
    //   url: "/dashboard/referral",
    //   icon: Share2,
    // },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]! bg-gradient-to-b from-gray-900 to-gray-950 shadow-sm backdrop-blur "
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu className="flex flex-col gap-2">
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="mt-4">
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <AIWakenIcon width={50} height={50} />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">AIWAKEN</span>
                  <span className="truncate text-xs">Awaken your companion through study.</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter className="flex flex-col gap-4 p-2 mb-2">
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
