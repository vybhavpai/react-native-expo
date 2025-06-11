import { AuthProvider, useAuth } from '@/lib/auth-context';
import { Stack, useRouter, useSegments } from 'expo-router';
import React, { useEffect } from 'react';

function RouteGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoadingUser } = useAuth();
  const router = useRouter();
  const segment = useSegments();
  const [ready, setReady] = React.useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) {
      const inAuthGroup = segment[0] === 'auth';
      if (!inAuthGroup && !user && !isLoadingUser) {
        router.replace('/auth');
      } else if (inAuthGroup && user && !isLoadingUser) {
        router.replace('/');
      }
    }
  }, [ready, user, router, segment, isLoadingUser]);

  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RouteGuard>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </RouteGuard>
    </AuthProvider>
  );
}
