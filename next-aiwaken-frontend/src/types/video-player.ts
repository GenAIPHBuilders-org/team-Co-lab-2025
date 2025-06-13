export interface VideoDetails {
  title: string;
  link: string;
  thumbnail: string;
  video_id: string;
}

export interface VideoPlayerProps {
  type:
    | "youtube_video"
    | "text"
    | "text_with_image"
    | "interactive_quiz_placeholder"
    | "pdf_document";
  content: string;
  accompanying_text: string;
  image_description?: string | null;
  video_details: VideoDetails;
  pdf_description?: string | null;
}
