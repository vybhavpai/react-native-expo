import { DATABASE_ID, HABITS_COLLECTION_ID, databases } from '@/lib/appwrite';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ID } from 'react-native-appwrite';
import {
  Button,
  SegmentedButtons,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';

const frequencyOptions = ['daily', 'weekly', 'monthly'];
type Frequency = (typeof frequencyOptions)[number];

export default function AddHabitScreen() {
  const [frequency, setFrequency] = useState<Frequency>('');
  const [habitName, setHabitName] = useState<string>('');
  const [habitDescription, setHabitDescription] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const router = useRouter();
  const theme = useTheme();

  const handleAddHabit = async () => {
    if (!user) {
      return;
    }
    const habit = {
      title: habitName,
      description: habitDescription,
      frequency,
      user_id: user.$id,
      streak_count: 0,
      created_at: new Date().toISOString(),
      last_completed: new Date().toISOString(),
    };

    try {
      await databases.createDocument(
        DATABASE_ID,
        HABITS_COLLECTION_ID,
        ID.unique(),
        habit
      );
      router.back();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        return;
      }
      setError('An error occurred while adding the habit');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Habit Name"
        mode="outlined"
        style={styles.input}
        value={habitName}
        onChangeText={setHabitName}
        textColor="black"
      />
      <TextInput
        label="Habit Description"
        mode="outlined"
        style={styles.input}
        value={habitDescription}
        onChangeText={setHabitDescription}
        textColor="black"
      />
      <View style={styles.frequencyContainer}>
        <SegmentedButtons
          value={frequency}
          onValueChange={(value: Frequency) => setFrequency(value)}
          buttons={frequencyOptions.map(option => ({
            label: option.charAt(0).toUpperCase() + option.slice(1),
            value: option,
          }))}
          theme={{ colors: { text: 'black', primary: 'black' } }}
        />
      </View>
      <Button
        icon="plus"
        onPress={handleAddHabit}
        disabled={!habitName || !habitDescription}
        mode="contained"
        style={styles.button}
      >
        Add Habit
      </Button>
      {error && <Text style={{ color: theme.colors.error }}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    color: 'black',
  },
  input: {
    marginBottom: 16,
    backgroundColor: 'white',
  },
  frequencyContainer: {
    marginBottom: 24,
  },
  segmentedButtons: {
    color: 'black',
  },
  button: {
    marginTop: 16,
  },
});
