"use client"

import { motion } from "framer-motion"
import { TopicSelectionCard } from "@/components/topic-selection"
import { UserCard } from "@/components/user-card"
import AnimationVariants from "@/lib/animations"
import { useAuthentication } from "@/contexts/auth-context"
import Forbidden from "../forbidden"
import { CompanionCard } from "@/components/companion-card"

export default function Page() {
  const { user } = useAuthentication();


  if (!user) {
    return <Forbidden />
  }

  return (
    <div className="flex flex-1 mt-16 flex-col gap-4 p-4 bg-gradient-to-b from-gray-900 to-gray-950 shadow-sm backdrop-blur">
      <motion.div
        className="grid grid-cols-2 grid-rows-3 gap-4"
        variants={AnimationVariants.containerVariants}
      >
        <motion.div variants={AnimationVariants.itemVariants} className="col-span-3 row-span-4">
          <TopicSelectionCard />
        </motion.div>
        <motion.div variants={AnimationVariants.itemVariants} className="col-span-2 row-span-4 col-start-4 row-start-1">
          <div className="h-full flex flex-col gap-4">
            <UserCard />
            <CompanionCard />
          </div>
        </motion.div>
      </motion.div>
    </div >
  )
}
