"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Bookmark,
  BookmarkCheck,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { VideoPlayerProps } from '@/types/video-player';
import { useVideoPlayer } from '@/hooks/use-video-player';
import ReactPlayer from 'react-player';
import { CompanionAvatar } from './companion-avatar';
import { useAuthentication } from '@/contexts/auth-context';

export function VideoPlayer({
  content,
  video_details
}: VideoPlayerProps) {
  const {
    isPlaying,
    isMuted,
    progress,
    isFullscreen,
    isBookmarked,
    setIsPlaying,
    setIsMuted,
    setIsBookmarked,
    playerContainerRef,
    playerRef,
    toggleFullscreen,
    handleProgress,
  } = useVideoPlayer();
  const { user } = useAuthentication();
  const companion = user?.preferences.companion

  return (
    <div className="w-full ">
      <div className="hidden md:block mb-4">
        <Card className="h-full bg-gray-800/50 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-4 mb-6 w-full">
              <div className="relative">
                <CompanionAvatar name={companion as string} size="lg" className="shadow-lg border-2 border-[#9F8DFC]" />
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#9F8DFC] text-white text-xs px-2 py-0.5 rounded-full shadow">
                  Guide
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-white">{companion}</span>
                <span className="text-xs text-gray-400">Your AI Learning Companion</span>
                <span className="text-xs text-[#9F8DFC] mt-1 font-semibold">Level 1</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="">
        <div className="md:col-span-2">
          <Card className="overflow-hidden bg-gray-800/50 border-gray-700">
            <div ref={playerContainerRef} className="relative aspect-video">
              <ReactPlayer
                ref={playerRef}
                url={content}
                width="100%"
                height="100%"
                playing={isPlaying}
                muted={isMuted}
                controls={false}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onProgress={handleProgress}
                config={{
                  youtube: {
                    playerVars: {
                      modestbranding: 1,
                      rel: 0,
                    },
                  },
                }}
                className="react-player"
              />

              <AnimatePresence>
                {!isPlaying && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/60 flex items-center justify-center cursor-pointer"
                    onClick={() => setIsPlaying(true)}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-20 h-20 rounded-full bg-[#9F8DFC]/90 flex items-center justify-center"
                    >
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 5V19L19 12L8 5Z" fill="white" />
                      </svg>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
                <div className="h-full bg-[#9F8DFC]" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <div className="p-3 flex items-center justify-between bg-gray-800/80">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="text-white" onClick={() => setIsPlaying(!isPlaying)}>
                  {isPlaying ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 4H6V20H10V4Z" fill="currentColor" />
                      <path d="M18 4H14V20H18V4Z" fill="currentColor" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
                    </svg>
                  )}
                </Button>
                <Button variant="ghost" size="sm" className="text-white" onClick={() => setIsMuted(!isMuted)}>
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
              </div>

              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="text-white" onClick={() => setIsBookmarked(!isBookmarked)}>
                  {isBookmarked ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
                </Button>
                <Button variant="ghost" size="sm" className="text-white" onClick={toggleFullscreen}>
                  {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-medium text-white">{video_details.title}</h3>
                <Badge variant="outline" className="bg-transparent text-[#9F8DFC] border-[#9F8DFC]">
                  Video Lesson
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
