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
      "Ch 1, Context matters: everyone arrives with a different background, and yours shapes your college experience. Know your context and use it.",
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
      {
        question: "Why does your personal context matter in college?",
        options: [
          "It doesn't, everyone's experience is the same",
          "Your background, responsibilities and goals shape what you need from college",
          "Only your high school grades matter",
          "Context only matters for graduate students",
        ],
        correctIndex: 1,
        explanation: "Students in the video chose Lehman for different reasons: cost, distance, a counselor's advice. Knowing your own context helps you make better choices.",
      },
    ],
    resource: {
      name: "Onboarding Advisement Office",
      tag: "Getting Started",
      description: "Helps new and transfer students get set up, from admission through registering for your first semester.",
      location: "Old Gym Building, Room 308B",
      hours: "Mon–Fri, 9:00 AM – 5:00 PM",
      url: "https://www.lehman.cuny.edu/advising",
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
      "Ch 7, Conflict is inevitable: in any community you'll disagree with roommates, group members or professors. Handle it with respect and talk it out early.",
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
      {
        question: "Your group project partner isn't doing their part. What's the best first step?",
        options: [
          "Do all the work yourself and stay quiet",
          "Complain about them to the class",
          "Talk to them directly and respectfully, then involve the professor if needed",
          "Quit the group",
        ],
        correctIndex: 2,
        explanation: "Conflict is normal. Addressing it early and respectfully usually solves it before it grows.",
      },
    ],
    resource: {
      name: "Office of Campus Life",
      tag: "Community",
      description: "Your hub for clubs, student government, leadership programs and events — the easiest way to find your people.",
      location: "Student Life Building, Room 219",
      hours: "Call 718-960-2590 for current hours",
      url: "https://lehman.edu/office-campus-life",
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
      "Ch 9, College is not your opinion: back up your ideas with evidence and sources, not just how you feel.",
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
      {
        question: "Your professor asks for an argument in an essay. What makes it college-level?",
        options: [
          "Stating your opinion strongly",
          "Supporting your ideas with evidence and sources",
          "Making it as long as possible",
          "Agreeing with the professor",
        ],
        correctIndex: 1,
        explanation: "In college, opinions need support. Evidence is what turns an opinion into an argument.",
      },
    ],
    resource: {
      name: "Lehman Tutoring Center (Instructional Support Services)",
      tag: "Academic Support",
      description: "Free tutoring in writing and course content, plus academic coaching and study-skills workshops.",
      location: "Old Gym Building, Room 205",
      hours: "Call 718-960-8175 for current hours",
      url: "https://lehman.edu/academics/instructional-support-services",
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
      name: "Office of Undergraduate Academic Advisement",
      tag: "Academic Support",
      description: "Advisors help you plan courses, explore or change your major, and stay on track to graduate.",
      location: "Shuster Hall, Room 275B",
      hours: "Mon–Fri, 9:00 AM – 5:00 PM",
      url: "https://www.lehman.cuny.edu/advising",
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
      name: "Student Health Center",
      tag: "Wellness",
      description: "Free or low-cost primary care for students, walk-ins welcome. Also helps with nutrition, immunizations and health insurance.",
      location: "Old Gym Building, Room B008",
      hours: "Mon–Fri, 9:00 AM – 5:00 PM",
      url: "https://www.lehman.cuny.edu/student-health-center",
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
      name: "Counseling Center",
      tag: "Personal Support",
      description: "Talk to a counselor when stress, deadlines or life feel like too much. Free sessions in person or online.",
      location: "Old Gym Building, Room 114",
      hours: "Mon–Thu 9:00 AM – 7:00 PM, Fri–Sat 9:00 AM – 5:00 PM (fall & spring)",
      url: "https://www.lehman.edu/student-affairs/counseling-center/",
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
      "Ch 8, Honesty & authenticity matter: be honest in your work and true to yourself. The student in the interview followed what he actually cares about.",
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
      {
        question: "Which choice shows honesty and authenticity in college?",
        options: [
          "Copying a friend's homework to save time",
          "Picking a major only to impress others",
          "Doing your own work and choosing a path that fits who you are",
          "Hiding that you're struggling",
        ],
        correctIndex: 2,
        explanation: "Academic honesty protects your learning, and being authentic leads you to a path you'll actually stay on.",
      },
    ],
    resource: {
      name: "Career Exploration & Development Center",
      tag: "Career",
      description: "Career counseling, help deciding on a major, internships and connections with employers.",
      location: "Shuster Hall, Room 254",
      hours: "Call 718-960-8366 for current hours",
      url: "https://www.lehman.edu/student-affairs/career-services/services/",
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
      name: "Leonard Lief Library",
      tag: "Study",
      description: "Quiet floors, group study spaces, computers and help from librarians. Your home base for getting work done.",
      location: "Leonard Lief Library building, main campus",
      hours: "Hours change by semester. See the library website.",
      url: "https://www.lehman.edu/library/",
      image: "",
    },
    xp: 20,
  },
];

export const TOTAL_LEVELS = levels.length;

export function getLevel(id: number): Level | undefined {
  return levels.find((level) => level.id === id);
}
