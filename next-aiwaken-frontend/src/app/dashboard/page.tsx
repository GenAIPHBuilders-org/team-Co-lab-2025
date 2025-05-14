"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { TopicSelectionCard } from "@/components/topic-selection"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button";

export const iframeHeight = "800px";
export const description = "A sidebar with a header and a search form.";

export default function Page() {
  const [progressValue, setProgressValue] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgressValue(65);
    }, 1000);

    setIsLoaded(true);

    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <div className="[--header-height:calc(--spacing(14))] ">
      <SidebarProvider className="flex flex-col">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <SiteHeader />
        </motion.div>
        <div className="flex flex-1">
          <AppSidebar collapsible="icon" />
          <SidebarInset>
            <div className="flex flex-1 flex-col gap-4 p-4 bg-gradient-to-b from-gray-900 to-gray-950 shadow-sm backdrop-blur">
              <motion.div
                className="grid auto-rows-min gap-4 md:grid-cols-2"
                variants={containerVariants}
                initial="hidden"
                animate={isLoaded ? "visible" : "hidden"}
              >
                <motion.div variants={itemVariants} className="md:col-span-1">
                  <Card className="flex-2 glow-border h-64 overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <motion.h2
                          className="text-2xl font-bold"
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.2, duration: 0.5 }}
                        >
                          Your Progress
                        </motion.h2>
                        <motion.div
                          className="xp-badge"
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{
                            delay: 0.4,
                            duration: 0.5,
                            type: "spring",
                            stiffness: 200,
                          }}
                          whileHover={{
                            scale: 1.1,
                            boxShadow: "0 0 8px rgba(255, 255, 255, 0.5)",
                          }}
                        >
                          <span>65</span>
                        </motion.div>
                      </div>
                      <div className="mb-4">
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-muted-foreground">
                            Level 6
                          </span>
                          <span className="text-sm text-muted-foreground">
                            Level 7
                          </span>
                        </div>
                        <Progress value={progressValue} className="h-2" />
                      </div>
                      <motion.div
                        className="flex justify-between text-sm"
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                      >
                        <span className="text-[#9F8DFC]">
                          Current XP: 650/1000
                        </span>
                        <span className="text-[#9F8DFC]">+350 XP needed</span>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <TopicSelectionCard />
                </motion.div>
                <motion.div
                  variants={itemVariants}
                  className="w-full md:col-span-2"
                >
                  <Card className="flex-2 overflow-hidden">
                    <div className="h-56 bg-muted/30 relative">
                      <img
                        src="https://images.unsplash.com/photo-1683127983818-208f46227c24?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="test"
                        className="w-full h-full object-cover opacity-30"
                      />
                      <div className="absolute bottom-0 left-0 right-0 h-1">
                        <div
                          className="bg-[#9F8DFC] h-full"
                          style={{ width: `${40}%` }}
                        ></div>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium mb-2">
                        Machine Learning Fundamentals
                      </h3>
                      <div className="flex justify-between text-sm text-muted-foreground mb-2">
                        <span>8/12 lessons</span>
                        <span>40% complete</span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full mt-2 bg-[#9F8DFC] text-white font-semibold relative overflow-hidden group"
                      >
                        {40 >= 100 ? "Review" : "Continue"}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
