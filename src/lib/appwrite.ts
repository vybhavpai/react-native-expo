import { Account, Client, Databases } from 'react-native-appwrite';

export const client = new Client()
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)
  .setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PLATFORM!);

export const account = new Account(client);

export const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DB!;
export const HABITS_COLLECTION_ID =
  process.env.EXPO_PUBLIC_APPWRITE_HABITS_COLLECTION_ID!;

export const databases = new Databases(client);

export interface RealtimeResponse {
  events: string[];
  payload: any;
}
