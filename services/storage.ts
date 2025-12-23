
export const STORAGE_KEYS = {
  POSTS: 'linkedin_clone_posts',
  USER: 'linkedin_clone_user',
  CHATS: 'linkedin_clone_chats',
  JOBS: 'linkedin_clone_jobs',
  NOTIFICATIONS: 'linkedin_clone_notifications',
  CONNECTIONS: 'linkedin_clone_connections'
};

export const storage = {
  save: (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  },
  load: <T>(key: string, defaultValue: T): T => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  }
};
