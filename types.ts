
export interface Comment {
  id: string;
  authorId: string;
  authorName: string;
  avatar: string;
  content: string;
  timestamp: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  type: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface User {
  id: string;
  name: string;
  headline: string;
  avatar: string;
  coverImage: string;
  connections: number;
  profileViews: number;
  about: string;
  experiences: Experience[];
}

export interface Post {
  id: string;
  authorId: string;
  author: {
    name: string;
    avatar: string;
    headline: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  likedByMe?: boolean;
  reposts: number;
  comments: Comment[];
  image?: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  postedDate: string;
  type: string;
  logo: string;
  description?: string;
}

export enum Page {
  HOME = 'home',
  NETWORK = 'network',
  JOBS = 'jobs',
  MESSAGING = 'messaging',
  NOTIFICATIONS = 'notifications',
  PROFILE = 'profile'
}
