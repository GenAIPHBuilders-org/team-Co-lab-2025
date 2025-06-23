import { AppSidebar } from "./app-sidebar";
import { SiteHeader } from "./site-header";
import { SidebarInset, SidebarProvider } from "./ui/sidebar";
import { fetchDailyRewards } from "@/services/ssr/fetch-daily-rewards";

type AuthLayoutProps = {
  isAuthenticated: boolean
  children: React.ReactNode
}
export async function AuthLayout({ children, isAuthenticated }: AuthLayoutProps) {
  const dailyRewards = await fetchDailyRewards();
  console.log("dailyRewards", dailyRewards);
  if (!isAuthenticated) return null;
  if (!dailyRewards) return null;

  return (
    <div className="[--header-height:calc(--spacing(14))] ">
      <SidebarProvider className="flex flex-col">
        <SiteHeader dailyRewards={dailyRewards} />
        <div className="flex flex-1">
          <AppSidebar collapsible="icon" />
          <SidebarInset>{children}</SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
