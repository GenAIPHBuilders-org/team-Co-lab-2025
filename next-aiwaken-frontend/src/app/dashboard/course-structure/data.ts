export const courseData: CourseData = {
    id: "MATH-101",
    title: "Mastering Mathematics: From Basics to Advanced",
    subtitle: "Build a strong foundation in mathematics",
    description:
        "Embark on a journey to master mathematics in this comprehensive course. Learn essential concepts, problem-solving techniques, and advanced topics that will help you excel in academics and beyond. This course combines theoretical knowledge with practical exercises to ensure a deep understanding of mathematical principles.",
    instructor: {
        name: "Dr. Alan Turing",
        title: "Mathematics Professor",
        avatar: "/images/instructors/alan-turing.jpg",
        bio: "Renowned mathematician and computer scientist, known for his groundbreaking work in mathematics and cryptography.",
    },
    duration: "8 weeks",
    level: "Beginner to Advanced",
    enrolledStudents: 3421,
    rating: 4.8,
    tags: [
        "Algebra",
        "Geometry",
        "Calculus",
        "Problem Solving",
        "Mathematical Thinking",
    ],
    thumbnail: "/images/courses/math-mastery.jpg",
    chapters: [
        {
            id: "ch-1",
            number: 1,
            title: "Fundamentals of Mathematics",
            description:
                "Learn the foundational concepts of mathematics, including numbers, operations, and basic problem-solving.",
            duration: "6 hours",
            progress: 0,
            unlocked: true,
            lessons: [
                {
                    id: "ch1-l1",
                    title: "Introduction to Numbers and Operations",
                    type: "video",
                    duration: "50 minutes",
                    description:
                        "Understand the basics of numbers, addition, subtraction, multiplication, and division.",
                    videoUrl: "/videos/ch1/numbers-operations.mp4",
                    completed: false,
                },
                {
                    id: "ch1-l2",
                    title: "Fractions and Decimals",
                    type: "interactive",
                    duration: "60 minutes",
                    description:
                        "Learn how to work with fractions and decimals in mathematical problems.",
                    completed: false,
                },
                {
                    id: "ch1-l3",
                    title: "Introduction to Algebra",
                    type: "video",
                    duration: "45 minutes",
                    description:
                        "Explore the basics of algebra, including variables, expressions, and equations.",
                    videoUrl: "/videos/ch1/algebra-basics.mp4",
                    completed: false,
                },
                {
                    id: "ch1-l4",
                    title: "Basic Geometry Concepts",
                    type: "reading",
                    duration: "40 minutes",
                    description:
                        "Learn about shapes, angles, and basic geometric properties.",
                    readingUrl: "/readings/ch1/geometry-basics.pdf",
                    completed: false,
                },
                {
                    id: "ch1-quiz",
                    title: "Chapter 1 Assessment",
                    type: "quiz",
                    duration: "30 minutes",
                    description:
                        "Test your understanding of fundamental mathematical concepts.",
                    questions: 10,
                    passingScore: 70,
                    completed: false,
                },
            ],
            resources: [
                {
                    title: "Mathematics Basics Handbook",
                    type: "PDF",
                    url: "/resources/math-basics-handbook.pdf",
                },
                {
                    title: "Interactive Number Line Tool",
                    type: "Interactive Tool",
                    url: "/resources/number-line-tool",
                },
            ],
        },
        {
            id: "ch-2",
            number: 2,
            title: "Intermediate Algebra and Geometry",
            description:
                "Dive deeper into algebraic concepts and explore more advanced geometry topics.",
            duration: "7 hours",
            progress: 0,
            unlocked: false,
            lessons: [
                {
                    id: "ch2-l1",
                    title: "Solving Linear Equations",
                    type: "video",
                    duration: "50 minutes",
                    description:
                        "Learn techniques for solving linear equations and inequalities.",
                    videoUrl: "/videos/ch2/linear-equations.mp4",
                    completed: false,
                },
                {
                    id: "ch2-l2",
                    title: "Graphing Functions",
                    type: "interactive",
                    duration: "60 minutes",
                    description:
                        "Understand how to graph linear and quadratic functions on a coordinate plane.",
                    completed: false,
                },
                {
                    id: "ch2-l3",
                    title: "Triangles and Circles",
                    type: "video",
                    duration: "45 minutes",
                    description:
                        "Explore the properties of triangles and circles in geometry.",
                    videoUrl: "/videos/ch2/triangles-circles.mp4",
                    completed: false,
                },
                {
                    id: "ch2-l4",
                    title: "Introduction to Trigonometry",
                    type: "reading",
                    duration: "40 minutes",
                    description:
                        "Learn the basics of trigonometry, including sine, cosine, and tangent.",
                    readingUrl: "/readings/ch2/trigonometry-basics.pdf",
                    completed: false,
                },
                {
                    id: "ch2-quiz",
                    title: "Chapter 2 Assessment",
                    type: "quiz",
                    duration: "30 minutes",
                    description:
                        "Test your knowledge of algebra and geometry concepts.",
                    questions: 15,
                    passingScore: 75,
                    completed: false,
                },
            ],
            resources: [
                {
                    title: "Algebra Problem-Solving Guide",
                    type: "PDF",
                    url: "/resources/algebra-guide.pdf",
                },
                {
                    title: "Geometry Visualization Tool",
                    type: "Interactive Tool",
                    url: "/resources/geometry-tool",
                },
            ],
        },
        {
            id: "ch-3",
            number: 3,
            title: "Advanced Mathematics",
            description:
                "Explore advanced topics in mathematics, including calculus and statistics.",
            duration: "8 hours",
            progress: 0,
            unlocked: false,
            lessons: [
                {
                    id: "ch3-l1",
                    title: "Introduction to Calculus",
                    type: "video",
                    duration: "60 minutes",
                    description:
                        "Learn the basics of calculus, including limits, derivatives, and integrals.",
                    videoUrl: "/videos/ch3/calculus-basics.mp4",
                    completed: false,
                },
                {
                    id: "ch3-l2",
                    title: "Probability and Statistics",
                    type: "interactive",
                    duration: "70 minutes",
                    description:
                        "Understand the fundamentals of probability and statistical analysis.",
                    completed: false,
                },
                {
                    id: "ch3-l3",
                    title: "Advanced Algebraic Techniques",
                    type: "video",
                    duration: "50 minutes",
                    description:
                        "Learn advanced algebraic methods for solving complex equations.",
                    videoUrl: "/videos/ch3/advanced-algebra.mp4",
                    completed: false,
                },
                {
                    id: "ch3-l4",
                    title: "Applications of Mathematics",
                    type: "reading",
                    duration: "45 minutes",
                    description:
                        "Explore real-world applications of mathematical concepts.",
                    readingUrl: "/readings/ch3/math-applications.pdf",
                    completed: false,
                },
                {
                    id: "ch3-quiz",
                    title: "Chapter 3 Assessment",
                    type: "quiz",
                    duration: "40 minutes",
                    description:
                        "Demonstrate your understanding of advanced mathematical topics.",
                    questions: 20,
                    passingScore: 80,
                    completed: false,
                },
            ],
            resources: [
                {
                    title: "Calculus Workbook",
                    type: "PDF",
                    url: "/resources/calculus-workbook.pdf",
                },
                {
                    title: "Statistics Analysis Tool",
                    type: "Interactive Tool",
                    url: "/resources/statistics-tool",
                },
            ],
        },
    ],
    certification: {
        title: "Certified Mathematics Mastery",
        issuer: "International Mathematics Association",
        validityPeriod: "Lifetime",
        skills: [
            "Algebra",
            "Geometry",
            "Calculus",
            "Problem Solving",
            "Statistical Analysis",
        ],
    },
};
