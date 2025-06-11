import { Stack, useRouter } from 'expo-router';
import React, { useEffect } from 'react';

function RouteGuard({ children }: { children: React.ReactNode }) {
  const isAuth = false;
  const router = useRouter();
  const [ready, setReady] = React.useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready && !isAuth) {
      router.replace('/auth');
    }
  }, [ready, isAuth, router]);

  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <RouteGuard>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </RouteGuard>
  );
}
