/*
 * ─────────────────────────────────────────────────────────────────────────
 *  ALL LEVEL CONTENT LIVES IN THIS FILE
 *  Videos, takeaways, quiz questions and resources are edited here and
 *  nowhere else. You never need to open a component.
 * ─────────────────────────────────────────────────────────────────────────
 *
 *  ADD A YOUTUBE VIDEO
 *    1. Open the video on YouTube and copy its ID, the part after "v=":
 *         https://www.youtube.com/watch?v=abc123XYZ_0   →   abc123XYZ_0
 *    2. Paste it into that level's videoUrl:
 *         videoUrl: "abc123XYZ_0",
 *       Pasting the whole YouTube link works too.
 *    Leave videoUrl as "" to show the "Video coming soon" card. "Mark as
 *    watched" still works, so the level can be completed either way.
 *
 *  EDIT A QUIZ QUESTION
 *    Each level has a quiz: [ ... ] list. In each question change:
 *      question      the text shown at the top
 *      options       the answers, shown in this order as A, B, C, D
 *      correctIndex  which option is right: 0 = A, 1 = B, 2 = C, 3 = D
 *      explanation   shown after the student answers
 *    To add a question, copy a whole { ... } block and paste it after the
 *    previous one. Keep at least one question per level.
 *
 *  MARKERS
 *    // TODO: replace   placeholder text that still needs real content
 *    // TODO: verify    a Lehman-specific detail to check before launch
 */

export type QuizQuestion = {
  question: string;
  /** Shown in this order as A, B, C, D. */
  options: string[];
  /** Position of the right answer in `options`: 0 = A, 1 = B, 2 = C, 3 = D. */
  correctIndex: number;
  explanation: string;
};

export type Resource = {
  name: string;
  tag: string;
  description: string;
  location: string;
  hours: string;
  url: string;
  /** A file in /public, e.g. "/images/advising.jpg". "" shows a placeholder picture. */
  image: string;
};

export type Level = {
  id: number;
  title: string;
  /** Book chapter this level covers, or null for the welcome and finish levels. */
  chapter: number | null;
  duration: string;
  /** YouTube video ID or link. "" shows the "Video coming soon" card. */
  videoUrl: string;
  takeaways: string[];
  quiz: QuizQuestion[];
  resource: Resource;
  xp: number;
};

export const levels: Level[] = [
  {
    id: 0,
    title: "Welcome / Start Here",
    chapter: null,
    duration: "2–4 min", // TODO: replace
    videoUrl: "",
    takeaways: [
      "Placeholder takeaway 1 for Level 0.", // TODO: replace
      "Placeholder takeaway 2 for Level 0.", // TODO: replace
    ],
    quiz: [
      {
        question: "Placeholder question for Level 0", // TODO: replace
        options: [
          "Placeholder answer A (correct)", // TODO: replace
          "Placeholder answer B", // TODO: replace
          "Placeholder answer C", // TODO: replace
          "Placeholder answer D", // TODO: replace
        ],
        correctIndex: 0,
        explanation: "Placeholder explanation: say why the right answer is right.", // TODO: replace
      },
    ],
    resource: {
      name: "New Student Resources", // TODO: verify
      tag: "Getting Started",
      description: "Placeholder description: say what this office helps students with.", // TODO: replace
      location: "Location to be confirmed", // TODO: verify
      hours: "Hours to be confirmed", // TODO: verify
      url: "https://www.lehman.edu/", // TODO: verify
      image: "",
    },
    xp: 20,
  },
  {
    id: 1,
    title: "Know Your New Community",
    chapter: 2,
    duration: "2–4 min", // TODO: replace
    videoUrl: "",
    takeaways: [
      "Lehman has many resources — use them early.", // TODO: replace
      "Get involved in clubs and events.", // TODO: replace
      "You're not alone — there's a community here for you.", // TODO: replace
    ],
    quiz: [
      {
        question: "Placeholder question 1 for Level 1", // TODO: replace
        options: [
          "Placeholder answer A (correct)", // TODO: replace
          "Placeholder answer B", // TODO: replace
          "Placeholder answer C", // TODO: replace
          "Placeholder answer D", // TODO: replace
        ],
        correctIndex: 0,
        explanation: "Placeholder explanation: say why the right answer is right.", // TODO: replace
      },
      {
        question: "Placeholder question 2 for Level 1", // TODO: replace
        options: [
          "Placeholder answer A (correct)", // TODO: replace
          "Placeholder answer B", // TODO: replace
          "Placeholder answer C", // TODO: replace
          "Placeholder answer D", // TODO: replace
        ],
        correctIndex: 0,
        explanation: "Placeholder explanation: say why the right answer is right.", // TODO: replace
      },
    ],
    resource: {
      name: "Office of Undergraduate Advising", // TODO: verify
      tag: "Academic Support",
      description: "Helps you with course planning, major changes, and academic questions.", // TODO: verify
      location: "Location to be confirmed", // TODO: verify
      hours: "Hours to be confirmed", // TODO: verify
      url: "https://www.lehman.edu/", // TODO: verify
      image: "",
    },
    xp: 20,
  },
  {
    id: 2,
    title: "Learning Is Hard Work",
    chapter: 3,
    duration: "2–4 min", // TODO: replace
    videoUrl: "",
    takeaways: [
      "Placeholder takeaway 1 for Level 2.", // TODO: replace
      "Placeholder takeaway 2 for Level 2.", // TODO: replace
    ],
    quiz: [
      {
        question: "Placeholder question for Level 2", // TODO: replace
        options: [
          "Placeholder answer A (correct)", // TODO: replace
          "Placeholder answer B", // TODO: replace
          "Placeholder answer C", // TODO: replace
          "Placeholder answer D", // TODO: replace
        ],
        correctIndex: 0,
        explanation: "Placeholder explanation: say why the right answer is right.", // TODO: replace
      },
    ],
    resource: {
      name: "Tutoring & Academic Support", // TODO: verify
      tag: "Academic Support",
      description: "Placeholder description: say what this office helps students with.", // TODO: replace
      location: "Location to be confirmed", // TODO: verify
      hours: "Hours to be confirmed", // TODO: verify
      url: "https://www.lehman.edu/", // TODO: verify
      image: "",
    },
    xp: 20,
  },
  {
    id: 3,
    title: "Change Is Ubiquitous",
    chapter: 4,
    duration: "2–4 min", // TODO: replace
    videoUrl: "",
    takeaways: [
      "Placeholder takeaway 1 for Level 3.", // TODO: replace
      "Placeholder takeaway 2 for Level 3.", // TODO: replace
    ],
    quiz: [
      {
        question: "Placeholder question for Level 3", // TODO: replace
        options: [
          "Placeholder answer A (correct)", // TODO: replace
          "Placeholder answer B", // TODO: replace
          "Placeholder answer C", // TODO: replace
          "Placeholder answer D", // TODO: replace
        ],
        correctIndex: 0,
        explanation: "Placeholder explanation: say why the right answer is right.", // TODO: replace
      },
    ],
    resource: {
      name: "Counseling Services", // TODO: verify
      tag: "Personal Support",
      description: "Placeholder description: say what this office helps students with.", // TODO: replace
      location: "Location to be confirmed", // TODO: verify
      hours: "Hours to be confirmed", // TODO: verify
      url: "https://www.lehman.edu/", // TODO: verify
      image: "",
    },
    xp: 20,
  },
  {
    id: 4,
    title: "Wellness Is Challenging",
    chapter: 5,
    duration: "2–4 min", // TODO: replace
    videoUrl: "",
    takeaways: [
      "Placeholder takeaway 1 for Level 4.", // TODO: replace
      "Placeholder takeaway 2 for Level 4.", // TODO: replace
    ],
    quiz: [
      {
        question: "Placeholder question for Level 4", // TODO: replace
        options: [
          "Placeholder answer A (correct)", // TODO: replace
          "Placeholder answer B", // TODO: replace
          "Placeholder answer C", // TODO: replace
          "Placeholder answer D", // TODO: replace
        ],
        correctIndex: 0,
        explanation: "Placeholder explanation: say why the right answer is right.", // TODO: replace
      },
    ],
    resource: {
      name: "Health & Wellness Services", // TODO: verify
      tag: "Wellness",
      description: "Placeholder description: say what this office helps students with.", // TODO: replace
      location: "Location to be confirmed", // TODO: verify
      hours: "Hours to be confirmed", // TODO: verify
      url: "https://www.lehman.edu/", // TODO: verify
      image: "",
    },
    xp: 20,
  },
  {
    id: 5,
    title: "Slow Down",
    chapter: 6,
    duration: "2–4 min", // TODO: replace
    videoUrl: "",
    takeaways: [
      "Placeholder takeaway 1 for Level 5.", // TODO: replace
      "Placeholder takeaway 2 for Level 5.", // TODO: replace
    ],
    quiz: [
      {
        question: "Placeholder question for Level 5", // TODO: replace
        options: [
          "Placeholder answer A (correct)", // TODO: replace
          "Placeholder answer B", // TODO: replace
          "Placeholder answer C", // TODO: replace
          "Placeholder answer D", // TODO: replace
        ],
        correctIndex: 0,
        explanation: "Placeholder explanation: say why the right answer is right.", // TODO: replace
      },
    ],
    resource: {
      name: "Library & Study Spaces", // TODO: verify
      tag: "Study",
      description: "Placeholder description: say what this office helps students with.", // TODO: replace
      location: "Location to be confirmed", // TODO: verify
      hours: "Hours to be confirmed", // TODO: verify
      url: "https://www.lehman.edu/", // TODO: verify
      image: "",
    },
    xp: 20,
  },
  {
    id: 6,
    title: "Success May Surprise You",
    chapter: 10,
    duration: "2–4 min", // TODO: replace
    videoUrl: "",
    takeaways: [
      "Placeholder takeaway 1 for Level 6.", // TODO: replace
      "Placeholder takeaway 2 for Level 6.", // TODO: replace
    ],
    quiz: [
      {
        question: "Placeholder question for Level 6", // TODO: replace
        options: [
          "Placeholder answer A (correct)", // TODO: replace
          "Placeholder answer B", // TODO: replace
          "Placeholder answer C", // TODO: replace
          "Placeholder answer D", // TODO: replace
        ],
        correctIndex: 0,
        explanation: "Placeholder explanation: say why the right answer is right.", // TODO: replace
      },
    ],
    resource: {
      name: "Career Services", // TODO: verify
      tag: "Career",
      description: "Placeholder description: say what this office helps students with.", // TODO: replace
      location: "Location to be confirmed", // TODO: verify
      hours: "Hours to be confirmed", // TODO: verify
      url: "https://www.lehman.edu/", // TODO: verify
      image: "",
    },
    xp: 20,
  },
  {
    id: 7,
    title: "Finish",
    chapter: null,
    duration: "2–4 min", // TODO: replace
    videoUrl: "",
    takeaways: [
      "Placeholder takeaway 1 for Level 7.", // TODO: replace
      "Placeholder takeaway 2 for Level 7.", // TODO: replace
    ],
    quiz: [
      {
        question: "Placeholder question for Level 7", // TODO: replace
        options: [
          "Placeholder answer A (correct)", // TODO: replace
          "Placeholder answer B", // TODO: replace
          "Placeholder answer C", // TODO: replace
          "Placeholder answer D", // TODO: replace
        ],
        correctIndex: 0,
        explanation: "Placeholder explanation: say why the right answer is right.", // TODO: replace
      },
    ],
    resource: {
      name: "Student Life & Clubs", // TODO: verify
      tag: "Community",
      description: "Placeholder description: say what this office helps students with.", // TODO: replace
      location: "Location to be confirmed", // TODO: verify
      hours: "Hours to be confirmed", // TODO: verify
      url: "https://www.lehman.edu/", // TODO: verify
      image: "",
    },
    xp: 20,
  },
];

export const TOTAL_LEVELS = levels.length;

export function getLevel(id: number): Level | undefined {
  return levels.find((level) => level.id === id);
}
