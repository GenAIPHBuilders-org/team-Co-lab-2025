"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, ChevronRight, ArrowLeft, BookOpen, Video, FileText, PenTool, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useGetCourseSummaryConclusion } from "@/(features)/course-action"
import { VideoPlayer } from "@/components/video-player"
import ReactMarkdown from 'react-markdown';
import { LearningStepQuiz } from "@/components/learning-step-quiz"
import { VideoPlayerProps } from "@/types/video-player"
import { CompanionGuide } from "@/components/companion-guide"
import AnimationVariants from "@/lib/animations"
import {
  AIContentGenerationResponseSection,
  AIContentGenerationResponseTopic,
  AIContentGenerationResponseLearningStep
} from "@/types/course"
import { useAuthentication } from "@/contexts/auth-context"
import { useCourseContext } from "@/contexts/course-context"

export default function CoursePage() {
  const [loadingContent, setLoadingContent] = useState<boolean>(false);
  const { getCourseSummaryConclusionAsync, isPending: loading } = useGetCourseSummaryConclusion();
  const { course: courseData } = useCourseContext();
  const router = useRouter()
  const { user } = useAuthentication();
  const companion = user?.preferences.companion
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({})
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({})
  const [selectedStep, setSelectedStep] = useState<string | null>(null)

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }))
  }

  const toggleTopic = (topicId: string) => {
    setExpandedTopics((prev) => ({
      ...prev,
      [topicId]: !prev[topicId],
    }))
  }

  const selectStep = async (stepId: string) => {
    try {
      setSelectedStep(stepId)
    } catch (error) {
      console.error("Error fetching content:", error)
    }
  }

  const getMaterialIcon = (materialType: string) => {
    switch (materialType) {
      case "text_with_image":
      case "text":
        return <BookOpen className="h-4 w-4" />
      case "youtube_video":
        return <Video className="h-4 w-4" />
      case "pdf_document":
        return <FileText className="h-4 w-4" />
      case "interactive_quiz_placeholder":
        return <PenTool className="h-4 w-4" />
      default:
        return <BookOpen className="h-4 w-4" />
    }
  }

  const getStep = () => {
    return courseData?.sections
      .flatMap((s: AIContentGenerationResponseSection) => s.topics)
      .flatMap((t: AIContentGenerationResponseTopic) => t.learning_steps)
      .find((s: AIContentGenerationResponseLearningStep) => s.step_id === selectedStep);
  }

  useEffect(() => {
    if (selectedStep) {
      setLoadingContent(true)
      const timer = setTimeout(() => {
        setLoadingContent(false)
      }, 1500)

      return () => clearTimeout(timer)
    }
  }, [selectedStep])

  const getContentByMaterialType = (materialType: string) => {
    const step = getStep();
    switch (materialType) {
      case "text_with_image":
      case "text":
        return (
          <div className="flex flex-col items-center w-full">
            <CompanionGuide companion={companion as string} />
            <div className="w-full max-w-2xl bg-gray-900/70 rounded-xl p-6 shadow-lg border border-gray-700">
              {typeof step?.content.content === "string"
                ? step.content.content.split("\n\n").map((paragraph: string, idx: number) => (
                  <div className="w-full flex flex-col space-y-2 mb-6" key={idx}>
                    <ReactMarkdown>
                      {paragraph}
                    </ReactMarkdown>
                  </div>
                ))
                : null}
            </div>
          </div>
        )
      case "youtube_video":
        return (
          <div className="flex flex-col items-center w-full">
            {step && step.content && step.content.video_details && isAllowedType(step.content.type) ? (
              <VideoPlayer
                type={step.content.type}
                content={step.content.video_details.url}
                accompanying_text={step.content.accompanying_text ?? ''}
                video_details={{
                  title: step.content.video_details.title,
                  link: step.content.video_details.url,
                  thumbnail: step.content.video_details.thumbnail,
                  video_id: step.content.video_details.video_id
                }}
                image_description={step.content.image_description ?? null}
                pdf_description={step.content.pdf_description ?? null}
              />
            ) : null}
          </div>
        )
      case "pdf_document":
        return (
          <div className="flex flex-col items-center w-full">
            <CompanionGuide companion={companion as string} />
            <div className="w-full max-w-2xl bg-gray-900/70 rounded-xl p-6 shadow-lg border border-gray-700">
              {step?.content.pdf_description && (
                <div className="w-full flex flex-col space-y-2 mb-6">
                  <ReactMarkdown>
                    {step.content.pdf_description}
                  </ReactMarkdown>
                </div>
              )}
              {typeof step?.content.content === "string"
                ? step.content.content.split("\n\n").map((paragraph: string, idx: number) => (
                  <div className="w-full flex flex-col space-y-2 mb-6" key={idx}>
                    <ReactMarkdown>
                      {paragraph}
                    </ReactMarkdown>
                  </div>
                ))
                : null}
            </div>
          </div>
        )
      case "interactive_quiz_placeholder":
        const quizDataArr = Array.isArray(step?.content?.content) ? step.content.content : undefined;
        return (
          <div className="flex flex-col items-center w-full">
            {quizDataArr ? (
              <LearningStepQuiz quizData={quizDataArr as unknown as QuizQuestion[]} />
            ) : null}
          </div>
        )
    }
  }

  async function handleCourseConclusion() {
    try {
      await getCourseSummaryConclusionAsync();
      router.push("/dashboard/boss-battle");
    } catch (error) {
      console.error("Error fetching course conclusion:", error);
    }
  }

  if (courseData === null) return null;

  const allowedTypes: VideoPlayerProps["type"][] = [
    "youtube_video",
    "text",
    "text_with_image",
    "interactive_quiz_placeholder",
    "pdf_document"
  ];
  function isAllowedType(type: unknown): type is VideoPlayerProps["type"] {
    return typeof type === 'string' && allowedTypes.includes(type as VideoPlayerProps["type"]);
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 p-4 md:p-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" className="text-white mr-2" onClick={() => router.push("/dashboard")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <span>Course Content</span>
                <Badge variant="outline" className="bg-transparent text-[#9F8DFC] border-[#9F8DFC]">
                  {courseData.difficulty.toUpperCase()}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <motion.div className="space-y-4" variants={AnimationVariants.containerVariants} initial="hidden" animate="visible">
                {courseData.sections.map((section: AIContentGenerationResponseSection, sectionIndex: number) => (
                  <motion.div
                    key={section.section_id}
                    className="border border-gray-700 rounded-lg overflow-hidden"
                    variants={AnimationVariants.itemVariants}
                  >
                    <div
                      className="flex items-center justify-between p-3 bg-gray-800/70 cursor-pointer"
                      onClick={() => toggleSection(section.section_id)}
                    >
                      <div className="flex items-center">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#9F8DFC]/20 text-[#9F8DFC] mr-3 text-xs font-medium">
                          {sectionIndex + 1}
                        </div>
                        <span className="font-medium text-white">{section.section_title}</span>
                      </div>
                      {expandedSections[section.section_id] ? (
                        <ChevronDown className="h-4 w-4 text-gray-400" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      )}
                    </div>

                    {expandedSections[section.section_id] && (
                      <div className="p-3 space-y-3 bg-gray-800/30">
                        {section.topics.map((topic: AIContentGenerationResponseTopic, topicIndex: number) => (
                          <div key={topic.topic_id} className="border border-gray-700/50 rounded-lg overflow-hidden">
                            <div
                              className="flex items-center justify-between p-2 bg-gray-800/50 cursor-pointer"
                              onClick={() => toggleTopic(topic.topic_id)}
                            >
                              <div className="flex items-center">
                                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-[#9F8DFC]/10 text-[#9F8DFC] mr-2 text-xs">
                                  {sectionIndex + 1}.{topicIndex + 1}
                                </div>
                                <span className="text-sm text-white">{topic.topic_title}</span>
                              </div>
                              {expandedTopics[topic.topic_id] ? (
                                <ChevronDown className="h-3 w-3 text-gray-400" />
                              ) : (
                                <ChevronRight className="h-3 w-3 text-gray-400" />
                              )}                            </div>

                            {expandedTopics[topic.topic_id] && (
                              <div className="p-2 space-y-2 bg-gray-800/20">
                                {topic.learning_steps.map((step: AIContentGenerationResponseLearningStep) => (
                                  <div
                                    key={step.step_id}
                                    className={`flex items-center p-2 rounded-md cursor-pointer text-xs ${selectedStep === step.step_id
                                      ? "bg-[#9F8DFC]/20 text-[#9F8DFC]"
                                      : "text-gray-300 hover:bg-gray-700/30"
                                      }`}
                                    onClick={() => selectStep(step.step_id)}
                                  >
                                    <div className="mr-2">{getMaterialIcon(step.material_type_suggestion)}</div>
                                    <span>{step.step_title}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
              <Button
                variant="outline"
                className="mt-4 w-full bg-[#9F8DFC] text-white hover:bg-[#9F8DFC]/80"
                loading={loading}
                disabled={loading}
                onClick={handleCourseConclusion}
              >
                Boss Battle
              </Button>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-2">
          <Card className="bg-gray-800/50 border-gray-700 h-full">
            <CardHeader>
              <CardTitle className="text-white">{courseData.course_title}</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedStep ? (
                <div className="space-y-4">
                  <div className="p-6 bg-gray-800/30 rounded-lg border border-gray-700 flex flex-col items-center justify-center min-h-[400px]">
                    <div className="w-16 h-16 rounded-full bg-[#9F8DFC]/20 flex items-center justify-center mb-4">
                      {getMaterialIcon(
                        courseData.sections
                          .flatMap((s: AIContentGenerationResponseSection) => s.topics)
                          .flatMap((t: AIContentGenerationResponseTopic) => t.learning_steps)
                          .find((s: AIContentGenerationResponseLearningStep) => s.step_id === selectedStep)?.material_type_suggestion || "",
                      )}
                    </div>
                    <h3 className="text-lg font-medium text-white mb-2">
                      {
                        courseData.sections
                          .flatMap((s: AIContentGenerationResponseSection) => s.topics)
                          .flatMap((t: AIContentGenerationResponseTopic) => t.learning_steps)
                          .find((s: AIContentGenerationResponseLearningStep) => s.step_id === selectedStep)?.step_title
                      }
                    </h3>
                    <div className="prose prose-lg max-w-3xl mx-auto space-y-4">
                      {loadingContent ? <div className="flex items-center justify-center h-full">
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </div> :
                        <>
                          {getContentByMaterialType(courseData.sections
                            .flatMap((s: AIContentGenerationResponseSection) => s.topics)
                            .flatMap((t: AIContentGenerationResponseTopic) => t.learning_steps)
                            .find((s: AIContentGenerationResponseLearningStep) => s.step_id === selectedStep)?.content.type || "")}
                        </>
                      }
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 bg-gray-800/30 rounded-lg border border-gray-700 flex flex-col items-center justify-center min-h-[400px]">
                  <div className="w-16 h-16 rounded-full bg-[#9F8DFC]/20 flex items-center justify-center mb-4">
                    <BookOpen className="h-8 w-8 text-[#9F8DFC]" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">Welcome to {courseData.course_title}</h3>
                  <p className="text-gray-400 text-center max-w-md">{courseData.course_description}</p>
                  <p className="text-gray-400 text-center mt-4">
                    Select a learning step from the course content to begin.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
