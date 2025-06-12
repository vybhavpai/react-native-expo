import {
  DATABASE_ID,
  databases,
  HABIT_COMPLETIONS_COLLECTION_ID,
  RealtimeResponse,
  client,
  HABITS_COLLECTION_ID,
} from '@/lib/appwrite';
import { useAuth } from '@/lib/auth-context';
import { Habit, HabitCompletion } from '@/models/database.type';
import { StreakData } from '@/models/streak';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Query } from 'react-native-appwrite';
import { Button, Card, Text } from 'react-native-paper';

export default function StreaksScreen() {
  const { user } = useAuth();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [habitCompletions, setHabitCompletions] = useState<HabitCompletion[]>(
    []
  );
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

  const fetchHabitCompletions = async () => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        HABIT_COMPLETIONS_COLLECTION_ID,
        [Query.equal('user_id', user?.$id ?? '')]
      );
      const completions = response.documents as HabitCompletion[];
      setHabitCompletions(completions);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(error);
      }
    }
  };

  const getStreak = (habitId: string): StreakData => {
    const specificHabitCompletions = habitCompletions
      .filter(completion => completion.habit_id === habitId)
      .sort(
        (a, b) =>
          new Date(a.completed_at).getTime() -
          new Date(b.completed_at).getTime()
      );
    if (specificHabitCompletions.length === 0) {
      return {
        streak: 0,
        bestStreak: 0,
        totalCompleted: 0,
      };
    }

    // build streak data
    let streak = 1;
    let bestStreak = 1;
    let totalCompleted = habitCompletions.length;
    let lastDate: Date | null = null;
    let currentStreak = 0;
    habitCompletions.forEach(completion => {
      const currentDate = new Date(completion.completed_at);

      if (lastDate) {
        const diff =
          (currentDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24);
        if (diff <= 1.5) {
          currentStreak++;
        } else {
          currentStreak = 1;
        }
      } else {
        lastDate = currentDate;
        bestStreak = Math.max(bestStreak, currentStreak);
        streak = currentStreak;
      }
    });
    return {
      streak,
      bestStreak,
      totalCompleted,
    };
  };

  const habitStreaks = habits.map((habit: Habit) => {
    const { streak, bestStreak, totalCompleted } = getStreak(habit.$id);
    return {
      habit,
      streak,
      bestStreak,
      totalCompleted,
    };
  });

  const rankedHabits = habitStreaks.sort((a, b) => b.bestStreak - a.bestStreak);

  useEffect(() => {
    if (user) {
      fetchHabits();
      fetchHabitCompletions();
    }
  }, [user]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text variant="titleLarge" style={styles.textBlack}>
        Habit Streaks
      </Text>
      {habits.length > 0 ? (
        <View style={styles.cardContainer}>
          {rankedHabits.map(({ habit, streak, bestStreak, totalCompleted }) => (
            <Card key={habit.$id} style={styles.card}>
              <Card.Content>
                <Text variant="titleMedium" style={styles.textBlack}>
                  {habit.title}
                </Text>
                <Text variant="bodyMedium" style={styles.textBlack}>
                  {habit.description}
                </Text>
                <View>
                  <View>
                    <Text>Streak Count: {streak}</Text>
                  </View>
                  <View>
                    <Text>Best streak: {bestStreak}</Text>
                  </View>
                  <View>
                    <Text>Total completed: {totalCompleted}</Text>
                  </View>
                </View>
              </Card.Content>
            </Card>
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
  noHabitsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noHabitsText: {
    color: '#666666',
  },
  cardContainer: {
    flex: 1,
    width: '100%',
    padding: 10,
  },
  card: {
    marginBottom: 10,
    backgroundColor: '#fff',
    // flexDirection: 'column',
    // flex: 1,
    // width: '100%',
  },
  cardContent: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  textBlack: {
    color: '#000',
  },
});
