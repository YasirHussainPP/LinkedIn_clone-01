
export const STORAGE_KEYS = {
  POSTS: 'linkedin_clone_posts',
  USER: 'linkedin_clone_user', // Current logged in user
  USERS_LIST: 'linkedin_clone_users_all', // All registered users
  CHATS: 'linkedin_clone_chats',
  JOBS: 'linkedin_clone_jobs',
  NOTIFICATIONS: 'linkedin_clone_notifications',
  CONNECTIONS: 'linkedin_clone_connections',
  AUTH_TOKEN: 'linkedin_clone_auth_active' // Boolean or session flag
};

export const storage = {
  save: (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  },
  load: <T>(key: string, defaultValue: T): T => {
    const data = localStorage.getItem(key);
    try {
      return data ? JSON.parse(data) : defaultValue;
    } catch (e) {
      return defaultValue;
    }
  },
  remove: (key: string) => {
    localStorage.removeItem(key);
  }
};
