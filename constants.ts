
import { User, Post, Job } from './types';

export const CURRENT_USER: User = {
  id: 'u1',
  name: 'Alex Johnson',
  headline: 'Senior Frontend Engineer | AI Enthusiast | Open Source Contributor',
  avatar: 'https://picsum.photos/seed/alex/150/150',
  coverImage: 'https://picsum.photos/seed/bg/800/200',
  connections: 542,
  profileViews: 128,
  about: "Senior Frontend Engineer with a passion for building AI-driven user interfaces. Expert in React, TypeScript, and modern styling frameworks.",
  experiences: [
    {
      id: 'e1',
      role: 'Senior Software Architect',
      company: 'Tech Giants Inc.',
      type: 'Full-time',
      startDate: '2021-01',
      endDate: 'Present',
      description: 'Leading the migration to a micro-frontend architecture while implementing advanced AI workflows.'
    }
  ]
};

export const MOCK_POSTS: Post[] = [
  {
    id: 'p1',
    authorId: 'other1',
    author: {
      name: 'Sarah Chen',
      avatar: 'https://picsum.photos/seed/sarah/150/150',
      headline: 'Product Designer at TechFlow'
    },
    content: 'Excited to share that we just launched our new design system! It was a massive 6-month effort from the whole team. Check it out! #design #ux #product',
    timestamp: '2h ago',
    likes: 156,
    reposts: 12,
    comments: [
      { id: 'c1', authorId: 'mike1', authorName: 'Mike Ross', avatar: 'https://picsum.photos/seed/mike/50/50', content: 'Great work team!', timestamp: '1h ago' }
    ],
    image: 'https://picsum.photos/seed/design/600/400'
  }
];

export const MOCK_JOBS: Job[] = [
  {
    id: 'j1',
    title: 'Senior React Developer',
    company: 'Innovate Solutions',
    location: 'San Francisco, CA (Remote)',
    postedDate: '1 day ago',
    type: 'Full-time',
    logo: 'https://picsum.photos/seed/corp1/100/100',
    description: 'We are looking for a Senior React Developer to lead our frontend team.'
  }
];
