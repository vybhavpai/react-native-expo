import { Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useAuth } from '@/lib/auth-context';

export default function Index() {
  const { signOut } = useAuth();
  return (
    <View style={styles.container}>
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Button icon="logout" onPress={() => signOut()}>
        Sign Out
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  link: {
    color: 'white',
    marginTop: 10,
    height: 40,
    width: 100,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
