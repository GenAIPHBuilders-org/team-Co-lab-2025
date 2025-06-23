export interface IBossBattleQuestionTypeResponse {
  id: string
  type: "multiple_choice" | "true_false" | "fill_blank"
  question_text: string
  options: string[]
  correct_answer: string
  explanation: string
  difficulty: "easy" | "medium" | "hard"
  topic: string
}

export interface IBossBattleAIGeneratedQuestion {
  boss_intro: string
  quiz_title: string
  easy_questions: IBossBattleQuestionTypeResponse[]
  medium_questions: IBossBattleQuestionTypeResponse[]
  hard_questions: IBossBattleQuestionTypeResponse[]
  hearts: number
  start_pool: string
}

export const quizData: IBossBattleAIGeneratedQuestion = {
  boss_intro:
    "Greetings, Jelal! I am Professor Syntax, and I shall test your grammatical prowess. Answer my questions correctly, or face the consequences!",
  quiz_title: "Professor Syntax's Sentence Structure Showdown",
  easy_questions: [
    {
      id: "easy_1",
      type: "true_false",
      question_text: "Now, Jelal, is the sentence 'The cat sat on the mat' a simple sentence?",
      options: [],
      correct_answer: "true",
      explanation: "Yes, it has one independent clause.",
      difficulty: "easy",
      topic: "Sentence Types",
    },
    {
      id: "easy_2",
      type: "multiple_choice",
      question_text: "Jelal, identify the subject in the sentence: 'Birds fly high'.",
      options: ["A. Fly", "B. High", "C. Birds", "D. High fly"],
      correct_answer: "C. Birds",
      explanation: "The subject is the noun performing the action.",
      difficulty: "easy",
      topic: "Sentence Elements",
    },
    {
      id: "easy_3",
      type: "true_false",
      question_text: "Jelal, is 'Running in the park, the dog barked.' a correctly punctuated sentence?",
      options: [],
      correct_answer: "false",
      explanation: "It is a dangling modifier. The dog was not running in the park.",
      difficulty: "easy",
      topic: "Sentence Structure",
    },
    {
      id: "easy_4",
      type: "fill_blank",
      question_text: "Jelal, complete the sentence: 'The quick brown fox ______ over the lazy dog.'",
      options: [],
      correct_answer: "jumped",
      explanation: "This is a common example sentence.",
      difficulty: "easy",
      topic: "Sentence Completion",
    },
    {
      id: "easy_5",
      type: "multiple_choice",
      question_text: "Jelal, what type of sentence is this: 'Go!'",
      options: ["A. Declarative", "B. Interrogative", "C. Imperative", "D. Exclamatory"],
      correct_answer: "C. Imperative",
      explanation: "It's a command.",
      difficulty: "easy",
      topic: "Sentence Types",
    },
    {
      id: "easy_6",
      type: "true_false",
      question_text: "Jelal, a sentence fragment is a complete sentence.",
      options: [],
      correct_answer: "false",
      explanation: "A sentence fragment is incomplete.",
      difficulty: "easy",
      topic: "Sentence Fragments",
    },
    {
      id: "easy_7",
      type: "fill_blank",
      question_text: "Jelal, fill in the blank to make a complete sentence: 'The sun ______ bright.'",
      options: [],
      correct_answer: "shines",
      explanation: "This completes the simple sentence.",
      difficulty: "easy",
      topic: "Sentence Completion",
    },
    {
      id: "easy_8",
      type: "multiple_choice",
      question_text: "Jelal, which word is the verb in: 'The dog chased the ball.'",
      options: ["A. Dog", "B. Chased", "C. Ball", "D. The"],
      correct_answer: "B. Chased",
      explanation: "The verb shows the action.",
      difficulty: "easy",
      topic: "Sentence Elements",
    },
    {
      id: "easy_9",
      type: "true_false",
      question_text: "Jelal, every sentence must have a subject and a verb.",
      options: [],
      correct_answer: "true",
      explanation: "A sentence needs a subject performing an action (verb).",
      difficulty: "easy",
      topic: "Sentence Structure",
    },
  ],
  medium_questions: [
    {
      id: "medium_1",
      type: "multiple_choice",
      question_text: "Jelal, identify the type of sentence: 'Although it was raining, we went for a walk.'",
      options: ["A. Simple", "B. Compound", "C. Complex", "D. Compound-Complex"],
      correct_answer: "C. Complex",
      explanation: "It contains one independent and one dependent clause.",
      difficulty: "medium",
      topic: "Sentence Types",
    },
    {
      id: "medium_2",
      type: "fill_blank",
      question_text:
        "Jelal, complete the sentence with appropriate punctuation: 'The old house stood on the hill it was...'",
      options: [],
      correct_answer: "creaking, and falling apart.",
      explanation: "Correct punctuation for compound sentence.",
      difficulty: "medium",
      topic: "Sentence Punctuation",
    },
    {
      id: "medium_3",
      type: "true_false",
      question_text: "Jelal, 'Running quickly, the race was won.' is grammatically correct.",
      options: [],
      correct_answer: "false",
      explanation: "Dangling modifier.",
      difficulty: "medium",
      topic: "Sentence Structure",
    },
    {
      id: "medium_4",
      type: "multiple_choice",
      question_text: "Jelal, what is the direct object in: 'She baked a delicious cake for her friend.'",
      options: ["A. She", "B. Baked", "C. Cake", "D. Friend"],
      correct_answer: "C. Cake",
      explanation: "The direct object receives the action of the verb.",
      difficulty: "medium",
      topic: "Sentence Elements",
    },
    {
      id: "medium_5",
      type: "fill_blank",
      question_text: "Jelal, identify the type of clause: 'because it was raining'.",
      options: [],
      correct_answer: "dependent",
      explanation: "Cannot stand alone as a sentence.",
      difficulty: "medium",
      topic: "Clauses",
    },
    {
      id: "medium_6",
      type: "true_false",
      question_text: "Jelal, a compound sentence contains at least two independent clauses.",
      options: [],
      correct_answer: "true",
      explanation: "Joined by a conjunction or semicolon.",
      difficulty: "medium",
      topic: "Sentence Types",
    },
    {
      id: "medium_7",
      type: "multiple_choice",
      question_text: "Jelal, which sentence uses correct parallel structure?",
      options: [
        "A. She likes swimming, running, and to hike.",
        "B. She likes to swim, to run, and to hike.",
        "C. She likes swimming, running, and hiking.",
        "D. She likes swim, run, and hike.",
      ],
      correct_answer: "C. She likes swimming, running, and hiking.",
      explanation: "Parallel structure uses the same grammatical form for items in a list.",
      difficulty: "medium",
      topic: "Parallel Structure",
    },
    {
      id: "medium_8",
      type: "fill_blank",
      question_text:
        "Jelal, what is the proper conjunction to join these clauses: 'The sun was shining, ______ we went to the beach.'",
      options: [],
      correct_answer: "so",
      explanation: "Shows cause and effect.",
      difficulty: "medium",
      topic: "Sentence Conjunctions",
    },
    {
      id: "medium_9",
      type: "true_false",
      question_text: "Jelal, a complex sentence has one independent clause and at least one dependent clause.",
      options: [],
      correct_answer: "true",
      explanation: "Definition of a complex sentence.",
      difficulty: "medium",
      topic: "Sentence Types",
    },
    {
      id: "medium_10",
      type: "multiple_choice",
      question_text: "Jelal, which is a correctly punctuated compound sentence?",
      options: [
        "A. The dog barked; the cat hissed.",
        "B. The dog barked, the cat hissed.",
        "C. The dog barked the cat hissed.",
        "D. The dog barked. The cat hissed.",
      ],
      correct_answer: "A. The dog barked; the cat hissed.",
      explanation: "Correct use of semicolon to join independent clauses.",
      difficulty: "medium",
      topic: "Sentence Punctuation",
    },
  ],
  hard_questions: [
    {
      id: "hard_1",
      type: "multiple_choice",
      question_text:
        "Jelal, diagram the sentence: 'The diligent student, despite the distractions, completed her assignment.' What is the main clause?",
      options: [
        "A. despite the distractions",
        "B. The diligent student completed her assignment",
        "C. The diligent student, despite the distractions",
        "D. completed her assignment",
      ],
      correct_answer: "B. The diligent student completed her assignment",
      explanation: "The main clause is the independent clause.",
      difficulty: "hard",
      topic: "Sentence Diagramming",
    },
    {
      id: "hard_2",
      type: "fill_blank",
      question_text:
        "Jelal, rewrite the sentence to eliminate the misplaced modifier: 'Walking down the street, the building looked old.'",
      options: [],
      correct_answer: "Walking down the street, I saw that the building looked old.",
      explanation: "Correctly places the modifier to modify the intended subject.",
      difficulty: "hard",
      topic: "Sentence Modification",
    },
    {
      id: "hard_3",
      type: "true_false",
      question_text: "Jelal, the sentence 'Having finished his work, the television beckoned.' is grammatically sound.",
      options: [],
      correct_answer: "false",
      explanation: "It contains a dangling modifier.",
      difficulty: "hard",
      topic: "Sentence Structure",
    },
    {
      id: "hard_4",
      type: "multiple_choice",
      question_text:
        "Jelal, identify the type of sentence: 'While the rain poured, and the wind howled, the little house stood firm.'",
      options: ["A. Simple", "B. Compound", "C. Complex", "D. Compound-Complex"],
      correct_answer: "D. Compound-Complex",
      explanation: "Contains multiple independent and dependent clauses.",
      difficulty: "hard",
      topic: "Sentence Types",
    },
    {
      id: "hard_5",
      type: "fill_blank",
      question_text:
        "Jelal, explain the difference between a restrictive and a nonrestrictive clause. Provide an example for each.",
      options: [],
      correct_answer:
        "Restrictive clauses are essential to the meaning of the sentence and are not set off by commas (e.g., The book that I borrowed is overdue). Nonrestrictive clauses add extra information and are set off by commas (e.g., My car, which is blue, needs a wash).",
      explanation: "Understanding restrictive and nonrestrictive clauses is crucial for proper punctuation.",
      difficulty: "hard",
      topic: "Clauses",
    },
    {
      id: "hard_6",
      type: "true_false",
      question_text:
        "Jelal, 'Although tired, he persevered, and he succeeded.' is a correctly punctuated compound-complex sentence.",
      options: [],
      correct_answer: "true",
      explanation: "Proper use of a dependent and two independent clauses.",
      difficulty: "hard",
      topic: "Sentence Punctuation",
    },
    {
      id: "hard_7",
      type: "multiple_choice",
      question_text: "Jelal, which sentence demonstrates correct appositive usage?",
      options: [
        "A. My dog, a golden retriever, likes to play fetch.",
        "B. My dog a golden retriever likes to play fetch.",
        "C. My dog, a golden retriever, he likes to play fetch.",
        "D. My dog a golden retriever, likes to play fetch.",
      ],
      correct_answer: "A. My dog, a golden retriever, likes to play fetch.",
      explanation: "Correct use of commas to set off appositive.",
      difficulty: "hard",
      topic: "Appositives",
    },
    {
      id: "hard_8",
      type: "fill_blank",
      question_text:
        "Jelal, rewrite the following sentence to improve its clarity and conciseness: 'Due to the fact that it was raining, we decided to stay inside.'",
      options: [],
      correct_answer: "Because it was raining, we stayed inside.",
      explanation: "Improved conciseness and clarity.",
      difficulty: "hard",
      topic: "Sentence Conciseness",
    },
    {
      id: "hard_9",
      type: "true_false",
      question_text: "Jelal, all compound sentences are also complex sentences.",
      options: [],
      correct_answer: "false",
      explanation: "Complex sentences have dependent clauses, compound sentences don't necessarily.",
      difficulty: "hard",
      topic: "Sentence Types",
    },
  ],
  hearts: 10,
  start_pool: "medium",
}