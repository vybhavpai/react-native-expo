import { Models } from 'react-native-appwrite';

export interface Habit extends Models.Document {
  title: string;
  description: string;
  frequency: string;
  streak_count: number;
  created_at: string;
  last_completed: string;
  user_id: string;
}
