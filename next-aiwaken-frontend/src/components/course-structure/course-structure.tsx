"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Award,
  BookOpen,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  FileText,
  HelpCircle,
  Lock,
  Play,
  Star,
  Users,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface CourseStructureProps {
  courseData: CourseData;
}

export function CourseStructure({ courseData }: CourseStructureProps) {
  const [expandedChapter, setExpandedChapter] = useState<number | null>(0);

  const toggleChapter = (index: number) => {
    setExpandedChapter(expandedChapter === index ? null : index);
  };

  const getLessonIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Play className="h-4 w-4 text-purple-400" />;
      case "reading":
        return <FileText className="h-4 w-4 text-blue-400" />;
      case "quiz":
        return <HelpCircle className="h-4 w-4 text-yellow-400" />;
      case "interactive":
        return <Zap className="h-4 w-4 text-green-400" />;
      case "boss-battle":
        return <Award className="h-4 w-4 text-red-500" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const calculateProgress = (chapter: Chapter) => {
    if (!chapter.lessons.length) return 0;
    const completedLessons = chapter.lessons.filter(
      (lesson) => lesson.completed
    ).length;
    return (completedLessons / chapter.lessons.length) * 100;
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Course Header */}
      <div className="relative mb-8 rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-black/80 z-10"></div>
        <div className="h-64 w-full bg-gray-900 relative">
          <Image
            src="/placeholder.svg?height=400&width=1200"
            alt={courseData.title}
            fill
            className="object-cover opacity-60"
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
          <div className="flex items-center mb-2">
            {courseData.tags.map((tag, i) => (
              <Badge
                key={i}
                variant="outline"
                className="mr-2 bg-purple-900/50 text-purple-200 border-purple-700"
              >
                {tag}
              </Badge>
            ))}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">
            {courseData.title}
          </h1>
          <p className="text-xl text-purple-200 mb-4">{courseData.subtitle}</p>

          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-purple-400 mr-2" />
              <span className="text-gray-200">{courseData.duration}</span>
            </div>
            <div className="flex items-center">
              <Users className="h-5 w-5 text-purple-400 mr-2" />
              <span className="text-gray-200">
                <span className="text-purple-300 font-bold">
                  {courseData.enrolledStudents.toLocaleString()}
                </span>{" "}
                Hunters Enrolled
              </span>
            </div>
            <div className="flex items-center">
              <div className="flex mr-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < Math.floor(courseData.rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-600"
                      }`}
                  />
                ))}
              </div>
              <span className="text-yellow-400 font-bold">
                {courseData.rating}
              </span>
            </div>
            <div className="flex items-center">
              <BookOpen className="h-5 w-5 text-purple-400 mr-2" />
              <span className="text-gray-200">{courseData.level}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Instructor Info */}
      <div className="mb-8 p-6 rounded-xl border border-purple-800/40 bg-black/60 backdrop-blur-sm">
        <h2 className="text-xl font-bold mb-4 text-white">Your Instructor</h2>
        <div className="flex items-center">
          <div className="w-16 h-16 rounded-full bg-purple-900 overflow-hidden mr-4 border-2 border-purple-600">
            <Image
              src="/placeholder.svg?height=100&width=100"
              alt={courseData.instructor.name}
              width={64}
              height={64}
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="font-bold text-white">
              {courseData.instructor.name}
            </h3>
            <p className="text-purple-300">{courseData.instructor.title}</p>
            <p className="text-sm text-gray-400 mt-1">
              {courseData.instructor.bio}
            </p>
          </div>
        </div>
      </div>

      {/* Course Description */}
      <div className="mb-8 p-6 rounded-xl border border-purple-800/40 bg-black/60 backdrop-blur-sm">
        <h2 className="text-xl font-bold mb-4 text-white">About This Course</h2>
        <p className="text-gray-300">{courseData.description}</p>
      </div>

      {/* Chapter List */}
      <h2 className="text-2xl font-bold mb-4 text-white">Course Content</h2>
      <div className="mb-8 space-y-4">
        {courseData.chapters.map((chapter, index) => (
          <div
            key={chapter.id}
            className="rounded-xl overflow-hidden border border-purple-800/40 bg-black/60 backdrop-blur-sm transition-all duration-300 hover:border-purple-600/60"
          >
            <div
              className={`p-4 flex justify-between items-center cursor-pointer ${chapter.unlocked ? "" : "opacity-70"
                }`}
              onClick={() => chapter.unlocked && toggleChapter(index)}
            >
              <div className="flex items-center flex-1">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-900 to-purple-700 flex items-center justify-center mr-4 text-white font-bold shadow-glow">
                  {chapter.number}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white">{chapter.title}</h3>
                  <div className="flex items-center text-sm text-gray-400">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{chapter.duration}</span>
                    <span className="mx-2">•</span>
                    <span>{chapter.lessons.length} lessons</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {chapter.unlocked ? (
                  <>
                    <div className="hidden sm:block w-24">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-400">Progress</span>
                        <span className="text-purple-400">
                          {Math.round(calculateProgress(chapter))}%
                        </span>
                      </div>
                      <Progress
                        value={calculateProgress(chapter)}
                        className="h-1.5"
                      />
                    </div>
                    {expandedChapter === index ? (
                      <ChevronUp className="h-5 w-5 text-purple-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-purple-400" />
                    )}
                  </>
                ) : (
                  <Lock className="h-5 w-5 text-purple-400" />
                )}
              </div>
            </div>

            {expandedChapter === index && chapter.unlocked && (
              <div className="border-t border-purple-800/40 p-4">
                <p className="text-gray-300 mb-4">{chapter.description}</p>

                <div className="space-y-2">
                  {chapter.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="flex items-center p-3 rounded-lg hover:bg-purple-900/20 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-purple-900/30 flex items-center justify-center mr-3">
                        {getLessonIcon(lesson.type)}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-medium">
                          {lesson.title}
                        </h4>
                        <p className="text-xs text-gray-400">
                          {lesson.type.charAt(0).toUpperCase() +
                            lesson.type.slice(1)}{" "}
                          • {lesson.duration}
                        </p>
                      </div>
                      {lesson.completed ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border border-purple-400"></div>
                      )}
                    </div>
                  ))}
                </div>

                {chapter.resources && chapter.resources.length > 0 && (
                  <div className="mt-6 p-4 bg-purple-900/10 rounded-lg border border-purple-800/30">
                    <h4 className="text-purple-300 font-medium mb-3 flex items-center">
                      <FileText className="h-4 w-4 mr-2" />
                      Chapter Resources
                    </h4>
                    <div className="space-y-2">
                      {chapter.resources.map((resource, i) => (
                        <div
                          key={i}
                          className="flex items-center text-sm group"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-2"></div>
                          <span className="text-gray-300 group-hover:text-purple-300 transition-colors">
                            {resource.title}
                          </span>
                          <span className="text-xs text-gray-500 ml-2">
                            ({resource.type})
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Certification */}
      <div className="mb-8 p-6 rounded-xl border border-purple-800/40 bg-black/60 backdrop-blur-sm">
        <div className="flex items-center mb-4">
          <Award className="h-8 w-8 text-yellow-400 mr-3" />
          <div>
            <h2 className="text-xl font-bold text-white">
              Course Certification
            </h2>
            <p className="text-sm text-gray-400">
              Complete all chapters to earn your certification
            </p>
          </div>
        </div>

        <div className="p-4 bg-gradient-to-r from-purple-900/20 to-black/20 rounded-lg border border-purple-800/30 mb-4">
          <h3 className="text-lg font-bold text-white mb-1">
            {courseData.certification.title}
          </h3>
          <p className="text-sm text-gray-300">
            Issued by {courseData.certification.issuer}
          </p>
          <p className="text-xs text-gray-400">
            Valid for {courseData.certification.validityPeriod}
          </p>
        </div>

        <h4 className="text-sm font-medium text-purple-300 mb-2">
          Skills You&apos;ll Gain:
        </h4>
        <div className="flex flex-wrap gap-2">
          {courseData.certification.skills.map((skill, i) => (
            <Badge
              key={i}
              className="bg-purple-900/40 hover:bg-purple-800/60 text-purple-200 border-purple-700/50"
            >
              {skill}
            </Badge>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="sticky bottom-4 flex justify-center">
        <Button
          size="lg"
          className="bg-gradient-to-r from-purple-800 to-purple-600 hover:from-purple-700 hover:to-purple-500 text-white font-bold px-8 py-6 rounded-full shadow-glow"
        >
          Begin Your Journey
        </Button>
      </div>
    </div>
  );
}
