export type MaterialType =
  | "text_with_image"
  | "youtube_video"
  | "interactive_quiz_placeholder"
  | "pdf_document"
  | "text";

export interface LearningStep {
  step_id: string;
  step_title: string;
  material_type_suggestion: MaterialType;
  content?: {
    text?: string;
    image_url?: string;
    video_title?: string;
    video_url?: string;
    quiz_id?: string;
    pdf_title?: string;
    pdf_url?: string;
  };
}

export interface Topic {
  topic_id: string;
  topic_title: string;
  learning_steps: LearningStep[];
}

export interface Section {
  section_id: string;
  section_title: string;
  topics: Topic[];
}

export interface Course {
  course_title: string;
  course_description: string;
  subject: string;
  difficulty: "easy" | "medium" | "hard";
  sections: Section[];
}

export const courseData: Course = {
  course_title: "Math Made Easy: A Beginner's Guide",
  course_description:
    "This course provides a gentle introduction to fundamental mathematical concepts, perfect for beginners or those looking to refresh their basic skills.  We'll cover whole numbers, basic operations, fractions, and simple geometry.",
  subject: "mathematics",
  difficulty: "easy",
  sections: [
    {
      section_id: "section_1",
      section_title: "Whole Numbers and Basic Operations",
      topics: [
        {
          topic_id: "topic_1_1",
          topic_title: "Understanding Whole Numbers",
          learning_steps: [
            {
              step_id: "step_1_1_1",
              step_title: "Introduction to Whole Numbers",
              material_type_suggestion: "text_with_image",
            },
            {
              step_id: "step_1_1_2",
              step_title: "Counting and Number Lines",
              material_type_suggestion: "youtube_video",
            },
            {
              step_id: "step_1_1_3",
              step_title: "Practice Counting and Identifying Numbers",
              material_type_suggestion: "interactive_quiz_placeholder",
            },
          ],
        },
        {
          topic_id: "topic_1_2",
          topic_title: "Addition and Subtraction",
          learning_steps: [
            {
              step_id: "step_1_2_1",
              step_title: "Introduction to Addition",
              material_type_suggestion: "text_with_image",
            },
            {
              step_id: "step_1_2_2",
              step_title: "Adding Numbers using Objects",
              material_type_suggestion: "youtube_video",
            },
            {
              step_id: "step_1_2_3",
              step_title: "Introduction to Subtraction",
              material_type_suggestion: "text_with_image",
            },
            {
              step_id: "step_1_2_4",
              step_title: "Practice Addition and Subtraction Problems",
              material_type_suggestion: "pdf_document",
            },
          ],
        },
      ],
    },
    {
      section_id: "section_2",
      section_title: "Multiplication and Division",
      topics: [
        {
          topic_id: "topic_2_1",
          topic_title: "Understanding Multiplication",
          learning_steps: [
            {
              step_id: "step_2_1_1",
              step_title: "Introduction to Multiplication as Repeated Addition",
              material_type_suggestion: "text_with_image",
            },
            {
              step_id: "step_2_1_2",
              step_title: "Multiplication Tables (1-5)",
              material_type_suggestion: "pdf_document",
            },
            {
              step_id: "step_2_1_3",
              step_title: "Practice Multiplication Problems",
              material_type_suggestion: "interactive_quiz_placeholder",
            },
          ],
        },
        {
          topic_id: "topic_2_2",
          topic_title: "Understanding Division",
          learning_steps: [
            {
              step_id: "step_2_2_1",
              step_title: "Introduction to Division",
              material_type_suggestion: "text_with_image",
            },
            {
              step_id: "step_2_2_2",
              step_title: "Division as Sharing",
              material_type_suggestion: "youtube_video",
            },
            {
              step_id: "step_2_2_3",
              step_title: "Practice Division Problems",
              material_type_suggestion: "pdf_document",
            },
          ],
        },
      ],
    },
    {
      section_id: "section_3",
      section_title: "Introduction to Fractions and Geometry",
      topics: [
        {
          topic_id: "topic_3_1",
          topic_title: "Understanding Fractions",
          learning_steps: [
            {
              step_id: "step_3_1_1",
              step_title: "What are Fractions?",
              material_type_suggestion: "text_with_image",
            },
            {
              step_id: "step_3_1_2",
              step_title: "Visualizing Fractions",
              material_type_suggestion: "youtube_video",
            },
            {
              step_id: "step_3_1_3",
              step_title: "Identifying Numerator and Denominator",
              material_type_suggestion: "text",
            },
          ],
        },
        {
          topic_id: "topic_3_2",
          topic_title: "Basic Shapes",
          learning_steps: [
            {
              step_id: "step_3_2_1",
              step_title:
                "Identifying Basic Shapes (Circles, Squares, Triangles)",
              material_type_suggestion: "text_with_image",
            },
            {
              step_id: "step_3_2_2",
              step_title: "Drawing Basic Shapes",
              material_type_suggestion: "youtube_video",
            },
            {
              step_id: "step_3_2_3",
              step_title: "Practice Identifying Shapes",
              material_type_suggestion: "interactive_quiz_placeholder",
            },
          ],
        },
      ],
    },
  ],
};
