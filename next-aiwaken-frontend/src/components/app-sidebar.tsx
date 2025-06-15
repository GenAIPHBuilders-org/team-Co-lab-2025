"use client"

import * as React from "react"
import {
  Share2,
  Sparkles,
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
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { GenieIcon } from "./icons/genie"

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
    {
      title: "Leaderboard",
      url: "/dashboard/leaderboard",
      icon: Sparkles,
    },
    {
      title: "Refer a Friend",
      url: "/dashboard/referral",
      icon: Share2,
    },
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
                  <GenieIcon width={30} height={30} />
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
        <Card className="bg-gray-900 p-4 rounded-lg shadow-sm">
          <CardHeader className="flex items-center gap-4">
            <img
              src={data.user.avatar}
              alt={data.user.name}
              className="h-10 w-10 rounded-full"
            />
            <div className="text-sm">
              <CardTitle className="font-semibold text-white">{data.user.name}</CardTitle>
              <CardDescription className="text-gray-400">{data.user.email}</CardDescription>
            </div>
          </CardHeader>
          <CardAction>
            <Button variant="outline" size="sm" className="w-full">
              View Profile
            </Button>
          </CardAction>
        </Card>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
