"use client"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { TopicSelectionCard } from "@/components/topic-selection"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export const iframeHeight = "800px"
export const description = "A sidebar with a header and a search form."

export default function Page() {
  return (
    <div className="[--header-height:calc(--spacing(14))] ">
      <SidebarProvider className="flex flex-col " >
        <SiteHeader />
        <div className="flex flex-1 ">
          <AppSidebar collapsible="icon"/>
          <SidebarInset>
            <div className="flex flex-1 flex-col gap-4 p-4  bg-gradient-to-b from-gray-900 to-gray-950 shadow-sm backdrop-blur">
              <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <Card className="flex-1 glow-border h-64">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold ">Your Progress</h2>
                    <div className="xp-badge">
                      <span>65</span>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Level 6</span>
                      <span className="text-sm text-muted-foreground">Level 7</span>
                    </div>
                      <Progress value={65} className="h-2" />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Current XP: 650/1000</span>
                    <span className="text-primary">+350 XP needed</span>
                  </div>
                </CardContent>
              </Card>
                <TopicSelectionCard />
                <div className="bg-muted/50 aspect-video rounded-xl" />
                <div className="bg-muted/50 aspect-video rounded-xl" />
                <div className="bg-muted/50 aspect-video rounded-xl" />
                <div className="bg-muted/50 aspect-video rounded-xl" />
              </div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}
