export { }

declare global {
    type TRegistration = {
        email: string;
        username: string;
        password: string;
    }

    type TLogin = {
        username: string;
        password: string;
        accessToken?: string;
    }

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
    }
    
    export interface CourseData {
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

    export interface Instructor {
      name: string;
      title: string;
      avatar: string;
      bio: string;
    }

    export interface Chapter {
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

    export interface Lesson {
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

    export interface Resource {
      title: string;
      type: string;
      url: string;
    }

    export interface Certification {
      title: string;
      issuer: string;
      validityPeriod: string;
      skills: string[];
    }
    
}