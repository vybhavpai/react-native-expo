import { createContext, useContext, useEffect, useState } from 'react';
import { ID, Models } from 'react-native-appwrite';
import { account } from '@/lib/appwrite';

type AuthContextType = {
  user: Models.User<Models.Preferences> | null;
  isLoadingUser: boolean;
  signUp: (email: string, password: string) => Promise<string | null>;
  signIn: (email: string, password: string) => Promise<string | null>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null
  );
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);
  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      setIsLoadingUser(true);
      const userSession = await account.get();
      setUser(userSession);
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoadingUser(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const user = await account.create(ID.unique(), email, password);
      await signIn(email, password);
      return null;
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
      return 'An unknown error occurred during sign up';
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const user = await account.createEmailPasswordSession(email, password);
      const session = await account.get();
      setUser(session);
      return null;
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
      return 'An unknown error occurred during sign in';
    }
  };

  const signOut = async () => {
    try {
      await account.deleteSession('current');
    } catch (error) {
      console.error('error in signing out', error);
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoadingUser, signUp, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
