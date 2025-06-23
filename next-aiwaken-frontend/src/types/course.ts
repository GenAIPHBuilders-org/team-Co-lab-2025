export type AIContentGenerationResponse = {
  course_title: string;
  course_description: string;
  subject: string;
  difficulty: string;
  sections: AIContentGenerationResponseSection[];
};

export type AIContentGenerationResponseSection = {
  section_id: string;
  section_title: string;
  topics: AIContentGenerationResponseTopic[];
};

export type AIContentGenerationResponseTopic = {
  topic_id: string;
  topic_title: string;
  learning_steps: AIContentGenerationResponseLearningStep[];
};

export type AIContentGenerationResponseLearningStep = {
  step_id: string;
  step_title: string;
  material_type_suggestion:
    | "text_with_image"
    | "youtube_video"
    | "interactive_quiz_placeholder"
    | "pdf_document"
    | "text";
  content: {
    type: string;
    content: string | TInteractiveQuizPlaceholderContent[];
    accompanying_text: string | null;
    image_description: string | null;
    video_details: {
      title: string;
      description: string;
      video_id: string;
      url: string;
      thumbnail: string;
    } | null;
    pdf_description: string | null;
  };
};

export type TInteractiveQuizPlaceholderContent = {
  monster_intro: string;
  question_text: string;
  options: string[];
  correct_answer: string;
  explanation: string;
  incorrect_explanation: string;
};
