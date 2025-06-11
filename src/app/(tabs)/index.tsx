import { View, StyleSheet } from 'react-native';
import { Text, Button, Surface } from 'react-native-paper';
import { useAuth } from '@/lib/auth-context';
import { DATABASE_ID, HABITS_COLLECTION_ID, databases } from '@/lib/appwrite';
import { Query } from 'react-native-appwrite';
import { useEffect, useState } from 'react';
import { Habit } from '@/models/database.type';
import { useRouter } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function Index() {
  const { signOut, user } = useAuth();
  const [habits, setHabits] = useState<Habit[]>([]);
  const router = useRouter();

  const fetchHabits = async () => {
    try {
      const habits = await databases.listDocuments(
        DATABASE_ID,
        HABITS_COLLECTION_ID,
        [Query.equal('user_id', user?.$id ?? '')]
      );
      setHabits(habits.documents as Habit[]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, [user]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Todays Habits</Text>
        <Button icon="logout" mode="text" onPress={signOut}>
          Sign Out
        </Button>
      </View>

      {habits?.length > 0 ? (
        <View style={styles.habitsContainer}>
          {habits.map((habit, index) => (
            <Surface style={styles.card} elevation={0}>
              <View key={index} style={styles.cardContainer}>
                <Text style={styles.cardTitle}>{habit.title}</Text>
                <Text style={styles.cardDescription}>{habit.description}</Text>
                <View style={styles.cardFooter}>
                  <View style={styles.streakBadge}>
                    {' '}
                    <MaterialCommunityIcons
                      name="fire"
                      size={18}
                      color="#ff9800"
                    />
                    <Text style={styles.streakText}>
                      {habit.streak_count} days streak
                    </Text>
                  </View>
                  <View style={styles.frequencyBadge}>
                    <Text style={styles.frequencyText}>
                      {habit.frequency.charAt(0).toUpperCase() +
                        habit.frequency.slice(1)}
                    </Text>
                  </View>
                </View>
              </View>
            </Surface>
          ))}
        </View>
      ) : (
        <View style={styles.noHabitsContainer}>
          <Text style={styles.noHabitsText}>
            No habits found! Add your first habit
          </Text>
          <Button
            icon="plus"
            mode="contained"
            onPress={() => router.push('/add-habit')}
          >
            Add Habit
          </Button>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 24,
  },
  title: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  habitsContainer: {
    width: '100%',
  },
  card: {
    marginBottom: 18,
    borderRadius: 18,
    backgroundColor: '#f7f2f8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  cardContainer: {
    padding: 20,
  },
  cardTitle: {
    color: '#22223b',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardDescription: {
    color: '#6c6c80',
    fontSize: 15,
    marginBottom: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff3e0',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  streakText: {
    color: '#ff9800',
    fontSize: 14,
    marginLeft: 6,
    fontWeight: 'bold',
  },
  frequencyBadge: {
    backgroundColor: '#ede7f6',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  frequencyText: {
    color: '#6a1b9a',
    fontSize: 14,
    fontWeight: 'bold',
  },
  noHabitsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noHabitsText: {
    color: '#666666',
  },
});
