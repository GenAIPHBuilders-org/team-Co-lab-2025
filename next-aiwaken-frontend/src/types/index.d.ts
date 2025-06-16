export {};

declare global {
  type TRegistration = {
    email: string;
    username: string;
    password: string;
  };

  type TLogin = {
    username: string;
    password: string;
    accessToken?: string;
  };

  type TUser = {
    user: {
      id: number;
      username: string;
      email: string;
      is_active: boolean;
      is_new_user?: boolean;
    };
    accessToken?: string;
    token_type?: string;
  };

  type TAuthContextValue = {
    user: TUser | null;
    login: (username: string, password: string) => Promise<void>;
    handleLogout: () => void;
    isAuthenticated: boolean;
    isLoading: boolean;
  };

  interface CourseData {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    instructor: Instructor;
    duration: string;
    level: string;
    enrolledStudents: number;
    rating: number;
    tags: string[];
    thumbnail: string;
    chapters: Chapter[];
    certification: Certification;
  }

  interface Instructor {
    name: string;
    title: string;
    avatar: string;
    bio: string;
  }

  interface Chapter {
    id: string;
    number: number;
    title: string;
    description: string;
    duration: string;
    progress: number;
    unlocked: boolean;
    lessons: Lesson[];
    resources: Resource[];
  }

  interface Lesson {
    id: string;
    title: string;
    type: string;
    duration: string;
    description: string;
    videoUrl?: string;
    readingUrl?: string;
    questions?: number;
    passingScore?: number;
    completed: boolean;
  }

  interface Resource {
    title: string;
    type: string;
    url: string;
  }

  type LearningStep = {
    step_id: string;
    step_title: string;
    material_type_suggestion: string;
  };

  type Topic = {
    topic_id: string;
    topic_title: string;
    learning_steps: LearningStep[];
  };

  type Section = {
    section_id: string;
    section_title: string;
    topics: Topic[];
  };

  type CourseOutline = {
    course_title: string;
    course_description: string;
    subject: string;
    difficulty: string;
    sections: Section[];
  };

  interface Certification {
    title: string;
    issuer: string;
    validityPeriod: string;
    skills: string[];
  }

  export type CourseParameters = {
    subject: string;
    difficulty: string;
  };

  export type Companion = {
    title: string;
    personality: string;
    motivation_style: string;
  };

  type CompanionsData = {
    Gabriel: Companion;
    Brian: Companion;
    Ryan: Companion;
    Kent: Companion;
  };

  type LearningStepContentResponse = {
    type:
      | "youtube_video"
      | "text"
      | "text_with_image"
      | "interactive_quiz_placeholder"
      | "pdf_document";
    content: string;
    accompanying_text: string;
    image_description: string;
    video_details: VideoDetails;
    pdf_description: string;
  };

  type VideoDetails = {
    title: string;
    link: string;
    thumbnail: string;
    video_id: string;
  };

  type LearningStepContentParams = {
    subject: string;
    topic_title: string;
    step_title: string;
    material_type_suggestion: string;
    difficulty: string;
    companion_name: string;
  };

  interface CourseConclusion {
    summary: string;
    quiz: QuizQuestion[];
    topics_covered: string[];
  }

  interface QuizQuestion {
    question_text: string;
    options: string[];
    correct_answer: string;
    explanation: string;
  }

  interface CourseConclusionParams {
    course_title: string;
    subject: string;
    difficulty: string;
    sections_data_json: SectionData[];
  }

  interface SectionData {
    section_title: string;
    topics: TopicData[];
  }

  interface TopicData {
    topic_title: string;
  }

  interface LearningStepQuizParams {
    subject: string;
    topic_title: string;
    step_title: string;
    difficulty: string;
    enemy_theme: string;
  }

  interface LearningStepQuizResponse {
    question_text: string;
    options: string[];
    correct_answer: string;
    explanation: string;
  }

  interface QuizData {
    quiz: {
      quiz: QuizQuestion[];
    };
  }

  interface MotivationResponse {
    motivation: string;
  }

  interface HintResponse {
    hint: string;
  }

  interface CompanionTipsParams {
    subject: string;
    topic_title: string;
    step_title: string;
    difficulty: string;
  }

  interface TipsResponse {
    tips: string;
  }

  interface IconProps extends React.SVGProps<SVGSVGElement> {
    width?: number | string;
    height?: number | string;
    className?: string;
    style?: React.CSSProperties;
  }
}
