"use client"
import ReactMarkdown from 'react-markdown';
import { useState, useRef, useEffect } from "react"
import ReactPlayer from "react-player/lazy"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bookmark, BookmarkCheck, Maximize2, Minimize2, Volume2, VolumeX } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface VideoDetails {
  title: string
  link: string
  thumbnail: string
  video_id: string
}

export interface VideoPlayerProps {
  type: "youtube_video" | "text" | "text_with_image" | "interactive_quiz_placeholder" | "pdf_document"
  content: string
  accompanying_text: string
  image_description?: string | null
  video_details: VideoDetails
  pdf_description?: string | null
}

export function VideoPlayer({ content, accompanying_text, video_details }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [showNotes, setShowNotes] = useState(true)
  const playerContainerRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<ReactPlayer>(null)

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      playerContainerRef.current?.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`)
      })
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  const handleProgress = (state: { played: number }) => {
    setProgress(state.played * 100)
  }

  return (
    <div className="w-full ">
      <div className="hidden md:block mb-4">
        <Card className="h-full bg-gray-800/50 border-gray-700">
          <CardContent className="p-4">
            <h3 className="text-md font-medium text-white mb-3 flex items-center">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2"
              >
                <path
                  d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Instructor Notes
            </h3>
            <div className="space-y-3">
              <p className="text-sm text-gray-300 w-full flex flex-col space-y-2 mb-6">
                <ReactMarkdown>
                  {accompanying_text}
                </ReactMarkdown>
              </p>
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
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white md:hidden"
                  onClick={() => setShowNotes(!showNotes)}
                >
                  Notes
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
              <div className="md:hidden">
                <AnimatePresence>
                  {showNotes && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="text-sm text-gray-300 mt-3">{accompanying_text.split("\n\n").map((paragraph: string, idx: number) => (
                        <span key={idx}>
                          {paragraph}
                          {idx < accompanying_text.split("\n\n").length - 1 && <br />}
                        </span>
                      ))}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
