/*
 * ─────────────────────────────────────────────────────────────────────────
 *  ALL LEVEL CONTENT LIVES IN THIS FILE
 *  Videos, takeaways, quiz questions and resources are edited here and
 *  nowhere else. You never need to open a component.
 * ─────────────────────────────────────────────────────────────────────────
 *
 *  ADD A VIDEO
 *    A clip stored with the app:
 *      1. Put the .mp4 file in public/videos/.
 *      2. Set that level's videoUrl to its path, starting at /videos/:
 *           videoUrl: "/videos/level-1-community.mp4",
 *      3. Put a still from the clip in public/videos/posters/ under the same
 *         name, ending in .jpg: level-1-community.jpg. It shows before the
 *         clip plays. The README has the command to make one.
 *    Or a YouTube video: paste its ID (the part after "v=") or the whole link:
 *           videoUrl: "abc123XYZ_0",
 *    Leave videoUrl as "" for a level without a video, like Finish: the
 *    level then has no video card and no watch step, and its quick check
 *    is open straight away.
 *    A level is marked as watched when its video plays to the end. The
 *    "Mark as watched" button works too, so a level can always be finished.
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
  /** Length of the video, shown under the title. Not shown for a level without a video. */
  duration: string;
  /** A clip in public/videos ("/videos/name.mp4"), or a YouTube ID or link. "" means no video and no watch step. */
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
    duration: "1 min",
    videoUrl: "/videos/level-0-welcome.mp4",
    takeaways: [
      "Every student here started as a freshman figuring it out.",
      "Students chose Lehman for its affordability, its location close to home, and recommendations from counselors.",
      "This path walks you through your first year one step at a time.",
    ],
    quiz: [
      {
        question: "Which reasons did students in the video give for choosing Lehman?",
        options: [
          "Only because of sports",
          "It was affordable and close to home",
          "Because it had no classes on Fridays",
          "Because their friends dared them",
        ],
        correctIndex: 1,
        explanation: "Affordability and being close to home came up again and again. A counselor's recommendation was another reason.",
      },
      {
        question: "One student said Lehman wasn't his first choice. What's the takeaway?",
        options: [
          "You can still build a great experience at a school you didn't plan on",
          "You should transfer right away",
          "Your first choice is the only path to success",
          "It doesn't matter where you go, so don't try",
        ],
        correctIndex: 0,
        explanation: "Where you start matters less than what you do once you're here.",
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
    duration: "35 sec",
    videoUrl: "/videos/level-1-community.mp4",
    takeaways: [
      "The Student Life Building has a game room and a welcoming community of students.",
      "The library is for more than books: you can study, and some people even nap there.",
      "Joining communities on campus helps you make friends and build stronger bonds.",
    ],
    quiz: [
      {
        question: "According to the video, where can you find a game room and a welcoming community of students?",
        options: [
          "The library",
          "The Student Life Building",
          "The parking lot",
          "The registrar's office",
        ],
        correctIndex: 1,
        explanation: "The Student Life Building is home to the game room and a lot of student activity.",
      },
      {
        question: "Why does Chapter 2 say knowing your campus community matters?",
        options: [
          "So you can avoid other students",
          "So you only rely on yourself",
          "So you know where to go for help, friends and support",
          "So you can skip classes",
        ],
        correctIndex: 2,
        explanation: "Knowing your community means knowing where to find people and resources before you need them.",
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
    duration: "25 sec",
    videoUrl: "/videos/level-2-learning-is-hard-work.mp4",
    takeaways: [
      "Do all your assignments and readings. They are the core of every class.",
      "If you need help, email your professor. Some will even share their phone number.",
      "Your classmates are a resource too, so reach out to them.",
    ],
    quiz: [
      {
        question: "You're stuck on an assignment. What does the video recommend first?",
        options: [
          "Skip it and hope it isn't graded",
          "Copy a classmate's answers",
          "Reach out to your professor by email",
          "Wait until the night before it's due",
        ],
        correctIndex: 2,
        explanation: "Professors expect questions. Emailing them early is one of the most useful habits you can build.",
      },
      {
        question: "What is one of the most important parts of college, according to the video?",
        options: [
          "Doing all your assignments and readings",
          "Having the most expensive laptop",
          "Never asking for help",
          "Only studying before exams",
        ],
        correctIndex: 0,
        explanation: "Learning takes consistent effort. Assignments and readings are where most of it happens.",
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
    duration: "15 sec",
    videoUrl: "/videos/level-3-change.mp4",
    takeaways: [
      "It's normal for your plans and your major to change.",
      "The student in the interview went from a creative field to architecture to social work.",
      "Changing direction isn't failing. It's figuring out what fits you.",
    ],
    quiz: [
      {
        question: "The student in the interview changed his intended career path several times. What does that show?",
        options: [
          "He made a mistake by coming to college",
          "Changing your path is a normal part of college",
          "You have to pick a major on day one and never change",
          "Changing your major means you failed",
        ],
        correctIndex: 1,
        explanation: "Change is everywhere in college. Exploring before you commit is part of the process.",
      },
      {
        question: "Which careers did he consider before choosing social work?",
        options: [
          "Nursing and law",
          "Graphic design and architecture",
          "Accounting and teaching",
          "Engineering and medicine",
        ],
        correctIndex: 1,
        explanation: "He started out wanting something creative like graphic design, then moved to architecture, and now he's pursuing social work.",
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
    duration: "1 min",
    videoUrl: "/videos/level-4-wellness.mp4",
    takeaways: [
      "Procrastinating can look like being lazy, but it catches up with you.",
      "Aim for about eight hours of sleep, even when there's a lot of work.",
      "Eating well and working out help you be more productive and happier.",
    ],
    quiz: [
      {
        question: "How much sleep does the video recommend?",
        options: [
          "About 4 hours",
          "About 6 hours",
          "About 8 hours",
          "As little as possible during exams",
        ],
        correctIndex: 2,
        explanation: "A good night's sleep, around eight hours, helps you stay healthy and productive.",
      },
      {
        question: "In the skit, the student was asleep when he had work due. What was really going on?",
        options: [
          "He was procrastinating",
          "He had already finished everything",
          "He was sick",
          "His class was cancelled",
        ],
        correctIndex: 0,
        explanation: "He said it himself: he wasn't resting, he was procrastinating. Rest is healthy, but avoiding your work isn't.",
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
    duration: "50 sec",
    videoUrl: "/videos/level-5-slow-down.mp4",
    takeaways: [
      "Slow down in class to observe and learn instead of rushing.",
      "Time management means doing what needs to get done first.",
      "Homework first, then fun time. Your future self will thank you.",
    ],
    quiz: [
      {
        question: "It's 9:50 and your work is due in 10 minutes. What habit would have prevented this?",
        options: [
          "Working faster at the last minute",
          "Managing your time and doing the work first",
          "Asking for an extension every time",
          "Doing all assignments at once at the end of the semester",
        ],
        correctIndex: 1,
        explanation: "Planning ahead keeps you out of last-minute panic.",
      },
      {
        question: "When you get home, what does the video suggest you do first?",
        options: [
          "Play games, then see if you have time for homework",
          "Go straight to sleep",
          "Do your homework first, then have fun",
          "Scroll social media to relax first",
        ],
        correctIndex: 2,
        explanation: "Getting the important work done first makes the free time actually free.",
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
    duration: "40 sec",
    videoUrl: "/videos/level-6-success.mp4",
    takeaways: [
      "Success can mean being mentally well, staying active, and helping your family.",
      "New passions can show up in college. He found photography and wants to minor in it.",
      "Your idea of success may grow in ways you didn't expect.",
    ],
    quiz: [
      {
        question: "Besides his career, what does the student include in his picture of success in 5–10 years?",
        options: [
          "Only making as much money as possible",
          "Being mentally well, staying active, and helping his parents",
          "Never working again",
          "Becoming famous online",
        ],
        correctIndex: 1,
        explanation: "Success covers more than a job. It includes wellness and the people you care about.",
      },
      {
        question: "What unexpected passion did he discover?",
        options: [
          "Cooking",
          "Photography",
          "Chess",
          "Coding",
        ],
        correctIndex: 1,
        explanation: "He learned photography, became really passionate about it, and is open to minoring in it. Success can surprise you.",
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
      "You've covered community, learning, change, wellness, time and success.",
      "Use the resources you found along the way. They're there for you.",
      "Your Lehman story is just getting started.",
    ],
    quiz: [
      {
        question: "Which habit from this path will help you most in your first year?",
        options: [
          "Asking for help early and managing my time",
          "Waiting until the last minute",
          "Avoiding campus communities",
          "Skipping sleep to get more done",
        ],
        correctIndex: 0,
        explanation: "Asking for help early, managing your time, and taking care of yourself tie the whole path together.",
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
