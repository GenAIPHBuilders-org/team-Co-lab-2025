import {
  AIContentGenerationResponseLearningStep,
  AIContentGenerationResponseSection,
  AIContentGenerationResponseTopic,
} from "@/types/course";
import { useAuthentication } from "@/contexts/auth-context";
import { TokenStorage } from "@/lib/token-storage";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useGetCourseSummaryConclusion } from "@/(features)/course-action";
import { VideoDetails, VideoPlayerProps } from "@/types/video-player";

export const useCourse = () => {
  const { getCourseSummaryConclusionAsync, isPending: loading } =
    useGetCourseSummaryConclusion();
  const courseData = TokenStorage.getCourseData();
  const router = useRouter();
  const { user } = useAuthentication();
  const companion = user?.preferences.companion;
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>(
    {}
  );
  const [selectedStep, setSelectedStep] = useState<string | null>(null);

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const toggleTopic = (topicId: string) => {
    setExpandedTopics((prev) => ({
      ...prev,
      [topicId]: !prev[topicId],
    }));
  };

  const selectStep = async (stepId: string) => {
    try {
      setSelectedStep(stepId);
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  };

  const getStep = () => {
    return courseData?.sections
      .flatMap((s: AIContentGenerationResponseSection) => s.topics)
      .flatMap((t: AIContentGenerationResponseTopic) => t.learning_steps)
      .find(
        (s: AIContentGenerationResponseLearningStep) =>
          s.step_id === selectedStep
      );
  };

  async function handleCourseConclusion(params: CourseConclusionParams) {
    try {
      await getCourseSummaryConclusionAsync(params);
      router.push("/dashboard/quiz");
    } catch (error) {
      console.error("Error fetching course conclusion:", error);
    }
  }

  function isVideoDetails(obj: unknown): obj is VideoDetails {
    return (
      !!obj &&
      typeof obj === "object" &&
      typeof (obj as VideoDetails).link === "string" &&
      typeof (obj as VideoDetails).title === "string"
    );
  }

  const allowedTypes: VideoPlayerProps["type"][] = [
    "youtube_video",
    "text",
    "text_with_image",
    "interactive_quiz_placeholder",
    "pdf_document",
  ];
  function isAllowedType(type: unknown): type is VideoPlayerProps["type"] {
    return (
      typeof type === "string" &&
      allowedTypes.includes(type as VideoPlayerProps["type"])
    );
  }

  return {
    expandedSections,
    expandedTopics,
    selectedStep,
    toggleSection,
    toggleTopic,
    selectStep,
    getStep,
    loading,
    getCourseSummaryConclusionAsync,
    companion,
    router,
    courseData,
    handleCourseConclusion,
    isVideoDetails,
    isAllowedType,
  };
};
