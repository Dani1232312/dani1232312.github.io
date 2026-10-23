export type Job = {
  title: string
  company: string
  period: string
  place?: string
  team?: string
  current?: boolean
  bullets: string[]
  tech: string[]
}

export type Game = {
  slug: string
  title: string
  genre: string
  blurb: string
  controls: string
  tech: string[]
  accent: string
}

export const profile = {
  name: 'Daniel Botnarenco',
  role: 'Software Engineer',
  location: 'Veldhoven, Netherlands',
  email: 'btn.daniel@yahoo.com',
  github: 'https://github.com/Dani1232312',
  about:
    'Software engineer with a background in real-time embedded systems, full-stack web development and interactive UI. I write production C/C++ for ASML’s lithography systems, and build web apps and 3D browser games on the side.',
}

export const experience: Job[] = [
  {
    title: 'Software Engineer',
    company: 'ALTEN, for ASML',
    period: 'Sep 2026 – Present',
    place: 'Veldhoven, Netherlands',
    // team: 'D&E SW ECS SICS (Software Outsourcing)',
    current: true,
    bullets: [
      'Joined ASML through ALTEN’s software outsourcing, working within the ECS / SICS software team.',
      'Contribute production C/C++ software for DUV lithography systems in a safety- and quality-critical codebase.',
    ],
    tech: ['C++', 'C', 'Git', 'Jenkins', 'JIRA', 'GoogleTest'],
  },
  {
    title: 'Software Engineer',
    company: 'ASML BV',
    period: 'Sep 2023 – Sep 2025',
    place: 'Veldhoven, Netherlands',
    bullets: [
      'Owned and developed core modules within the Expose Sequence of ASML’s DUV systems.',
      'Delivered software changes executed on every wafer processed worldwide.',
      'Engineered high-performance, low-latency C++/C solutions meeting hard real-time constraints.',
      'Involved in all stages of wafer processing, interfacing with optics, motion control, and sensors.',
      'Led creation of Software Impact Analysis documents outlining benefits, drawbacks, regression/progression considerations, and cross-component implications.',
      'Mentored new team members, performed code reviews, maintained high code quality standards.',
      'Acted as component representative in stakeholder meetings, aligning cross-team priorities.',
    ],
    tech: ['C++', 'C', 'Git', 'Jenkins', 'JIRA', 'GDB', 'Valgrind', 'GoogleTest', 'Python', 'Agile Scrum'],
  },
  {
    title: 'Freelance Software Engineer',
    company: 'Self-employed',
    period: 'Jan 2023 – Present',
    bullets: [
      'Delivered custom software solutions using React, Laravel, and .NET.',
      'Built a real-time .NET web app tracking multiple locations with map integration.',
      'Created Laravel-based education platforms with audio submissions and gamified UX.',
      'Delivered lightweight SEO-optimized landing pages for small businesses.',
      'Ensured cross-device accessibility, backend stability, and intuitive interfaces.',
      'Collaborated directly with stakeholders using Agile-like workflow.',
    ],
    tech: ['.NET', 'C#', 'Laravel', 'PHP', 'React', 'JavaScript', 'MySQL', 'REST APIs', 'HTML', 'CSS'],
  },
  {
    title: 'Full Stack Developer',
    company: 'Cloudmazing BV',
    period: 'Oct 2022 – Feb 2023',
    place: 'Netherlands',
    bullets: [
      'Developed full-featured web apps using Laravel and React.',
      'Participated in requirement gathering sessions and designed database schemas.',
      'Built responsive, interactive frontend components aligned with UX principles.',
      'Handled end-to-end feature development, from architecture to testing.',
      'Collaborated in a small team, owning separate client projects but sharing knowledge.',
    ],
    tech: ['Laravel', 'PHP', 'React', 'JavaScript', 'MySQL', 'Eloquent ORM', 'REST APIs', 'HTML', 'CSS'],
  },
  {
    title: 'Frontend Developer',
    company: 'Halloy BV',
    period: 'Jun 2021 – Jan 2022',
    place: 'Netherlands',
    bullets: [
      'Designed complex interactive UIs using React, React Native, and TypeScript.',
      'Developed a custom 3D visualization system for warehouse logistics.',
      'Built 3D renderer from scratch using advanced geometric computations.',
      'Integrated frontend with backend APIs ensuring synchronized performant data flows.',
      'Worked in a small Agile team, owning the frontend stack and contributing to sprints.',
    ],
    tech: ['React', 'React Native', 'TypeScript', 'JavaScript', 'REST APIs', 'CSS Modules'],
  },
]

// slug is the folder the deploy workflow builds the game into, and the cover's file name
export const games: Game[] = [
  {
    slug: 'polderstad',
    title: 'Polderstad',
    genre: 'City builder',
    blurb:
      'A 3D city builder set in a Dutch polder. Lay out zones, roads, rail and canals, and watch trains, cars, bikes and boats move through the town you grew.',
    controls: 'Mouse & keyboard',
    tech: ['Three.js', 'WebGL', 'JavaScript'],
    accent: '#ff8a3d',
  },
  {
    slug: 'crypt-runner',
    title: 'Lavender Crypts',
    genre: 'Dungeon crawler',
    blurb:
      'Every floor is a freshly generated maze of halls. Pick one of 12 heroes, fight through the dead with melee, arcane bolts and dashes, beat the Warden and take the stairs up.',
    controls: 'Keyboard & mouse, or touch',
    tech: ['Three.js', 'WebGL', 'glTF', 'Python'],
    accent: '#b69cff',
  },
]

export const otherWork = [
  { title: 'Multi-location tracker', text: 'Real-time web app tracking several locations on a live map.', tech: '.NET · C#' },
  { title: 'Education platform', text: 'Course platform with audio submissions and a gamified flow for students.', tech: 'Laravel · PHP' },
  { title: '3D warehouse viewer', text: 'Custom renderer for warehouse logistics, built from the geometry up.', tech: 'React · TypeScript' },
]

export const education = [
  { degree: 'Project Management', school: 'National School of Political and Administrative Studies', period: '2023 – 2025', place: 'Bucharest, Romania' },
  { degree: 'Computer Science', school: 'University of Twente', period: '2019 – 2023', place: 'Enschede, Netherlands' },
]

export const skills = [
  { area: 'Systems', note: 'Real-time C/C++ for lithography machines', items: ['C++', 'C', 'GoogleTest', 'GDB', 'Valgrind', 'Python'] },
  { area: 'Web', note: 'Full-stack apps, front to back', items: ['TypeScript', 'React', '.NET / C#', 'Laravel / PHP', 'MySQL', 'REST APIs'] },
  { area: 'Graphics', note: '3D in the browser, from scratch', items: ['Three.js', 'WebGL', 'glTF', 'Geometry'] },
]
