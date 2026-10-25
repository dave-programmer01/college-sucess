# First Year, Level by Level

A phone-first web app that walks a new Lehman College student through their first year in eight short levels. Each level has a video, a few key takeaways, a quick check and a campus resource. Levels unlock in order, and finishing them all leads to a checklist the student can download.

There is no server and no sign-in. Everything the student does is saved in their own browser.

## Run it

You need Node.js 20.9 or newer.

```bash
npm install      # once
npm run dev      # start the app at http://localhost:3000
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Runs the app for editing. Changes show up as you save. |
| `npm run build` | Builds the app for release. Also checks the content file for mistakes (see below). |
| `npm run start` | Serves the built app. Run `npm run build` first. |
| `npm run lint` | Checks the code style. |

There are no environment variables and no database. To publish, run the build and deploy to any host that runs Next.js.

## Edit the content

**All level content is in one file: [`src/data/levels.ts`](src/data/levels.ts).** Titles, videos, takeaways, quiz questions and resources are edited there and nowhere else. The file starts with a short guide, and each level looks like this:

```ts
{
  id: 1,
  title: "Know Your New Community",
  chapter: 2,                  // book chapter, or null for none
  duration: "2–4 min",
  videoUrl: "",                // clip in public/videos, or YouTube ID or link; "" for no video
  takeaways: ["…", "…"],       // two or three short lines
  quiz: [ { question, options, correctIndex, explanation } ],
  resource: { name, tag, description, location, hours, url, image },
  xp: 20,
},
```

### Add a video

A video can be a clip stored with the app, or a YouTube video.

**A clip stored with the app** (how the current videos work):

1. Put the file in [`public/videos/`](public/videos/), for example `public/videos/level-1-community.mp4`.
2. Set that level's `videoUrl` to its path, starting with `/videos/` and without `public`:

   ```ts
   videoUrl: "/videos/level-1-community.mp4",
   ```

3. Give it a still image: a frame from the clip saved in [`public/videos/posters/`](public/videos/posters/) under the same name, ending in `.jpg`, for example `public/videos/posters/level-1-community.jpg`. It is shown before the clip plays; without it, iPhones may show a black box. To grab the frame one second in:

   ```bash
   ffmpeg -ss 1 -i public/videos/level-1-community.mp4 -frames:v 1 -q:v 3 public/videos/posters/level-1-community.jpg
   ```

Use MP4 files (H.264 video, AAC sound), which play in every browser. The clip plays in the browser's own player inside the video card, and only its still image and length load until the student presses play. Clips are served with the site, so keep them short and small: the current seven add up to about 14 MB.

**A YouTube video:**

1. Open the video on YouTube and copy its ID, the part after `v=`:
   `https://www.youtube.com/watch?v=abc123XYZ_0` → `abc123XYZ_0`
2. Paste it into that level's `videoUrl`:

   ```ts
   videoUrl: "abc123XYZ_0",
   ```

Pasting the whole link works too, including `youtu.be` share links.

Leave `videoUrl` as `""` for a level without a video, like Finish: the level then has no video card and no watch step, and its quick check is open straight away.

A level is marked as watched when its clip plays to the end, which opens its quick check. The student can also press "Mark as watched", so a level can always be finished, including with a YouTube video or one that can't be played. Update `duration` to match the clip, for example `"35 sec"`; it is shown under the level's title. A level without a video doesn't show it.

### Edit or add a quiz question

Each level has a `quiz` list with one or more questions:

```ts
{
  question: "Which office helps you plan your courses?",
  options: [
    "Academic advising",   // A
    "The bookstore",       // B
    "Campus parking",      // C
    "The gym",             // D
  ],
  correctIndex: 0,         // 0 = A, 1 = B, 2 = C, 3 = D
  explanation: "Advisers help you choose courses and stay on track.",
},
```

- `options` are shown in the order you write them, labelled A, B, C, D.
- `correctIndex` says which one is right, counting from 0.
- `explanation` is shown after the student answers, whether they were right or wrong.

To add a question, copy a whole `{ … }` block and paste it after the previous one. Every level needs at least one question.

### Change a resource and its picture

Each level's `resource` appears on the Resources tab and in the ⋮ menu of that level.

- `name`, `tag`, `description`, `location`, `hours` and `url` are plain text. `url` is where "Visit website" goes; leave it `""` to hide that button.
- `image` is the picture. To add one:
  1. Put the file in [`public/images/`](public/images/), for example `public/images/advising.jpg`.
  2. Point to it, starting with a slash and without `public`:

     ```ts
     image: "/images/advising.jpg",
     ```

  A wide photo works best, about 16:9 and at least 800 pixels across. It is cropped to a square on the list and to 16:9 in the detail view. A full web address (`https://…`) also works. Leave `image` as `""` to keep the placeholder drawing.

### Add or remove a level

Add or delete a block in the `levels` list. The `id`s must count up from 0 with no gaps, in order. The path, the "Level N of 8" labels, the final checklist and the PDF all follow the list automatically.

### Mistakes the app catches for you

`npm run dev` and `npm run build` check `levels.ts` and stop with a message naming the level if:

- a level has no quiz question,
- a `correctIndex` doesn't match one of the options, or a question has fewer than two options,
- the `id`s don't count up from 0.

Video problems don't stop the build. A `videoUrl` that is neither a path in `public/videos/` nor a YouTube ID or link, or that names a file that isn't there, prints a warning, and that level shows "Video coming soon". The same card appears if a clip fails to load in the browser. A clip without its still image also prints a warning, with the command to make one.

## Before you launch

The content is real: the videos, takeaways and quizzes, and the eight Lehman resources, whose names, locations, hours and links were checked on lehman.edu in October 2026. Office details change, so check the resources again before each semester, hours and links especially. To see whether every resource link still loads:

```bash
grep -o 'url: "[^"]*"' src/data/levels.ts | cut -d'"' -f2 | xargs -n1 curl -sL -o /dev/null -w "%{http_code} %{url_effective}\n"
```

Each line should start with `200`. A `404` means that office's page has moved.

Still placeholders: the resource pictures (see [Change a resource and its picture](#change-a-resource-and-its-picture)) and the landing and final-screen drawings (see [Swap the illustrations](#swap-the-illustrations)).

When you add something you haven't finished or checked yet, mark it in `levels.ts` so it is easy to find later:

| Marker | Meaning | How to list them |
| --- | --- | --- |
| `// TODO: replace` | Placeholder text that needs real content | `grep -n "TODO: replace" src/data/levels.ts` |
| `// TODO: verify` | A Lehman-specific detail (office name, location, hours, link) that must be checked | `grep -n "TODO: verify" src/data/levels.ts` |

Don't put a guessed room number or opening time in front of students; write "to be confirmed" until it is checked. Right now the only marker left is on the Finish level's `duration`, which isn't shown because Finish has no video.

## Swap the illustrations

The drawings are placeholders, each in its own file in [`src/components/illustrations/`](src/components/illustrations/):

| File | Where it appears |
| --- | --- |
| `HeroPath.tsx` | Landing page, next to the headline |
| `Campus.tsx` | Final "You did it!" screen |
| `MediaPlaceholder.tsx` | "Video coming soon" card (a video that is set but can't be played), and any resource without a picture |

To use real artwork, put the image in `public/images/` and replace the drawing where it is used. For the landing page, in [`src/app/page.tsx`](src/app/page.tsx):

```tsx
import Image from "next/image";

// instead of <HeroPath className="h-auto w-full rounded-card" />
<Image
  src="/images/hero.png"
  alt="A path winding up to Lehman College"
  width={1120}
  height={880}
  priority
  className="h-auto w-full rounded-card"
/>
```

The final screen works the same way in [`src/app/complete/page.tsx`](src/app/complete/page.tsx). Use the image's real pixel size for `width` and `height`. If the artwork needs a separate dark-mode version, add both images and show one with the `dark:hidden` class and the other with `hidden dark:block`.

The browser-tab icon is the logo: `src/app/icon.svg`, `src/app/favicon.ico` and `src/app/apple-icon.png`. Replace all three to change it.

## How progress is saved

- Progress lives in the student's browser (local storage), on that device only. There are no accounts, and nothing is sent anywhere.
- It survives closing the tab or refreshing. Clearing the browser's site data, or using a different browser or device, starts from zero.
- A student can start over from **Profile → Reset progress**.
- Levels unlock strictly in order. Typing a locked level's address sends the student back to the path. This is a convenience, not security: someone determined can edit their own browser's storage.
- Each level is worth its `xp` value (20). The streak counts days in a row the app was opened and restarts after a missed day.
- The downloadable checklist is a PDF made in the browser. Its built-in font covers Western European characters; long dashes and curly quotes are turned into plain ones, and emoji or other scripts are left out of the PDF.

## Where things are

```
src/
  data/levels.ts        all level content (the file you will edit most)
  app/                  one folder per screen
    page.tsx              landing page
    (tabs)/               path, resources and profile, which share the header and bottom nav
    level/[id]/           a level, and its quick check in check/
    complete/             final screen
    globals.css           colours, type sizes, corner radius, shadows
  components/           the building blocks of the screens
    illustrations/        placeholder drawings
  lib/                  logic with no visuals
    progress.ts           the rules: what is unlocked, XP, streak, saving
    level-route.ts        checks levels.ts for mistakes
    checklist-pdf.ts      builds the PDF
    motion.ts             every animation's timing in one place
public/videos/          the level videos, and their still images in posters/
public/images/          pictures you add
```

### Colours and type

Colours, type sizes, corner radius and shadows are defined once at the top of [`src/app/globals.css`](src/app/globals.css), with a light and a dark value for each. Change a value there and every screen follows.

## Notes for developers

- Built with Next.js 16 (App Router), React 19, Tailwind CSS 4, Framer Motion, next-themes and lucide-react. Next 16 differs from earlier versions in places; `AGENTS.md` points to the docs bundled in `node_modules/next/dist/docs/`.
- `cacheComponents` is on, so Next keeps recently visited pages mounted but hidden instead of unmounting them. Two things follow from that, and both are easy to trip over:
  - An animation cut off when a page is hidden never finishes. `PageTransition` uses `useVisitKey` so each page starts fresh when it is shown again. Keep stateful screen components inside `PageTransition`.
  - Framer Motion ignores animation targets that change while a page is hidden. Where saved progress drives an animation, the component is keyed on that progress (see `PathOverview`).
- If an element must animate when its state changes, keep it the same element in both states. The path rows and the quiz card stay a `div` and only turn their title into a link, because swapping the wrapper would rebuild everything inside and skip the animation.
- Level pages are fully static (`ensureStatic = "navigation"` with `generateStaticParams`), so an unknown level returns a real 404.
- People who ask their device for reduced motion get fades only: no sliding, scaling, pulsing, shaking or confetti. Use `usePressable` for hover and press feedback so that stays true.
