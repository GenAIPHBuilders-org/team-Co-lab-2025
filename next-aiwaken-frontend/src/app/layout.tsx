import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryClientContextProvider } from "@/contexts/query-client-context";
import { AuthenticationProvider } from "@/contexts/auth-context";
import { getServerAuthSession } from "@/services/ssr/auth";
import { AuthLayout } from "@/components/auth-layout";
import React, { Suspense } from "react";
import RouteLoader from "@/components/route-loader";
import Loading from "./loading";
import DashboardLoading from "./dashboard/loading";
import { OnboardingStepperContainer } from "@/components/onboarding-stepper/onboarding";
import { CompanionProvider } from "@/contexts/companion-context";
import { fetchLatestUserTopics } from "@/services/ssr/fetch-latest-course";
import { LatestCourseProvider } from "@/contexts/latest-course-context";
import { TTopics } from "@/services/topic-service";
import { fetchSsrUserCourse } from "@/services/ssr/fetch-course-from-redis";
import { CourseProvider } from "@/contexts/course-context";
import { fetchSsrCourseSuggestion } from "@/services/ssr/fetch-user-suggestion";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AIWAKEN - Level Up Your Education",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await getServerAuthSession();
  const latestUserTopic = await fetchLatestUserTopics();
  const courseData = await fetchSsrUserCourse();
  const ssrCourseSuggestion = await fetchSsrCourseSuggestion();

  if (data?.user.is_new_user) {
    return (
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <QueryClientContextProvider>
            <div
              className={`w-full h-screen p-4 flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-950 shadow-sm backdrop-blur`}
            >
              <OnboardingStepperContainer />
            </div>
          </QueryClientContextProvider>
        </body>
      </html>
    );
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <React.Fragment>
          <RouteLoader />
          <QueryClientContextProvider>
            <AuthenticationProvider initialUser={data}>
              {!data?.user.is_active ? (
                <React.Fragment>
                  <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 flex items-center justify-center p-4 ">
                    <Suspense fallback={
                      <Loading />
                    }>
                      {children}
                    </Suspense>
                  </div>
                </React.Fragment>
              ) : (
                <Suspense
                  fallback={
                    <DashboardLoading />
                  }
                >
                  <CompanionProvider>
                    <AuthLayout isAuthenticated={data?.user.is_active}>
                      <LatestCourseProvider data={latestUserTopic as TTopics}>
                        <CourseProvider data={courseData} ssrCourseSuggestion={ssrCourseSuggestion}>
                          {children}
                        </CourseProvider>
                      </LatestCourseProvider>
                    </AuthLayout>
                  </CompanionProvider>
                </Suspense>
              )}
            </AuthenticationProvider>
          </QueryClientContextProvider>
        </React.Fragment>
      </body>
    </html>
  );
}
