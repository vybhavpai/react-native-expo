import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Surface } from 'react-native-paper';
import { useAuth } from '@/lib/auth-context';
import {
  DATABASE_ID,
  HABITS_COLLECTION_ID,
  HABIT_COMPLETIONS_COLLECTION_ID,
  RealtimeResponse,
  client,
  databases,
} from '@/lib/appwrite';
import { ID, Query } from 'react-native-appwrite';
import { useEffect, useRef, useState } from 'react';
import { Habit, HabitCompletion } from '@/models/database.type';
import { useRouter } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Swipeable from 'react-native-gesture-handler/Swipeable';

export default function Index() {
  const { signOut, user } = useAuth();
  const [habits, setHabits] = useState<Habit[]>([]);
  const router = useRouter();
  const swipeableRefs = useRef<{ [key: string]: Swipeable | null }>({});
  const [todayCompletions, setTodayCompletions] = useState<string[]>([]);
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

  const fetchTodayCompletions = async () => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const response = await databases.listDocuments(
        DATABASE_ID,
        HABIT_COMPLETIONS_COLLECTION_ID,
        [
          Query.equal('user_id', user?.$id ?? ''),
          Query.greaterThanEqual('completed_at', today.toISOString()),
        ]
      );
      const completions = response.documents as HabitCompletion[];
      setTodayCompletions(completions.map(completion => completion.habit_id));
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (user) {
      const habitsChannel = `databases.${DATABASE_ID}.collections.${HABITS_COLLECTION_ID}.documents`;
      const completionsChannel = `databases.${DATABASE_ID}.collections.${HABIT_COMPLETIONS_COLLECTION_ID}.documents`;
      const habitsSubscription = client.subscribe(
        habitsChannel,
        (response: RealtimeResponse) => {
          if (
            response.events.includes(
              'databases.*.collections.*.documents.*.create'
            )
          ) {
            fetchHabits();
          } else if (
            response.events.includes(
              'databases.*.collections.*.documents.*.update'
            )
          ) {
            fetchHabits();
          } else if (
            response.events.includes(
              'databases.*.collections.*.documents.*.delete'
            )
          ) {
            fetchHabits();
          }
        }
      );
      const completionsSubscription = client.subscribe(
        completionsChannel,
        (response: RealtimeResponse) => {
          if (
            response.events.includes(
              'databases.*.collections.*.documents.*.create'
            )
          ) {
            fetchTodayCompletions();
          }
        }
      );
      fetchHabits();
      fetchTodayCompletions();
      return () => {
        habitsSubscription();
        completionsSubscription();
      };
    }
  }, [user]);

  const handledeleteHabit = async (habitId: string) => {
    try {
      let response = await databases.deleteDocument(
        DATABASE_ID,
        HABITS_COLLECTION_ID,
        habitId
      );
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(error);
      }
    }
  };

  const handleCompleteHabit = async (habitId: string) => {
    if (!user || todayCompletions.includes(habitId)) return;
    try {
      const currentDate = new Date().toISOString();
      let response = await databases.createDocument(
        DATABASE_ID,
        HABIT_COMPLETIONS_COLLECTION_ID,
        ID.unique(),
        {
          habit_id: habitId,
          user_id: user.$id,
          completed_at: currentDate,
        }
      );
      const habit = habits.find(h => h.$id === habitId);
      if (!habit) return;

      let habitUpdateResponse = await databases.updateDocument(
        DATABASE_ID,
        HABITS_COLLECTION_ID,
        habitId,
        {
          streak_count: habit.streak_count + 1,
          last_completed: currentDate,
        }
      );
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(error);
      }
    }
  };

  const isHabitCompleted = (habitId: string) => {
    return todayCompletions.includes(habitId);
  };

  const renderRightActions = (habitId: string) => (
    <View style={styles.swipeRightAction}>
      {isHabitCompleted(habitId) ? (
        <Text style={styles.completedText}>Completed!</Text>
      ) : (
        <MaterialCommunityIcons
          name="check-circle-outline"
          size={32}
          color="#fff"
        />
      )}
    </View>
  );

  const renderLeftActions = () => (
    <View style={styles.swipeLeftAction}>
      <MaterialCommunityIcons name="trash-can-outline" size={32} color="#fff" />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Todays Habits</Text>
        <Button icon="logout" mode="text" onPress={signOut}>
          Sign Out
        </Button>
      </View>

      {habits?.length > 0 ? (
        <ScrollView
          style={styles.habitsContainer}
          showsVerticalScrollIndicator={false}
        >
          {habits.map((habit, index) => (
            <Swipeable
              key={index}
              overshootLeft={false}
              overshootRight={false}
              ref={ref => {
                swipeableRefs.current[habit.$id] = ref;
              }}
              renderLeftActions={renderLeftActions}
              renderRightActions={() => renderRightActions(habit.$id)}
              onSwipeableOpen={direction => {
                if (direction === 'left') {
                  handledeleteHabit(habit.$id);
                } else if (direction === 'right') {
                  handleCompleteHabit(habit.$id);
                }
                swipeableRefs.current[habit.$id]?.close();
              }}
            >
              <Surface
                style={[
                  styles.card,
                  isHabitCompleted(habit.$id) && styles.completedCard,
                ]}
                elevation={0}
              >
                <View style={styles.cardContainer}>
                  <Text style={styles.cardTitle}>{habit.title}</Text>
                  <Text style={styles.cardDescription}>
                    {habit.description}
                  </Text>
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
            </Swipeable>
          ))}
        </ScrollView>
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
  completedCard: {
    opacity: 0.6,
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
  swipeLeftAction: {
    backgroundColor: '#e53935',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flex: 1,
    borderRadius: 18,
    marginBottom: 18,
    marginTop: 2,
    paddingRight: 16,
  },
  swipeRightAction: {
    backgroundColor: '#4caf50',
    justifyContent: 'center',
    alignItems: 'flex-end',
    flex: 1,
    borderRadius: 18,
    marginBottom: 18,
    marginTop: 2,
    paddingLeft: 16,
  },
  completedText: {
    color: '#fff',
  },
});
