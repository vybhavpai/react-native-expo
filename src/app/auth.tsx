import { KeyboardAvoidingView, Platform, View, StyleSheet } from 'react-native';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';
import React from 'react';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'expo-router';

export default function AuthScreen() {
  const [isSignUp, setIsSignUp] = React.useState<Boolean>(false);
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [error, setError] = React.useState<string | null>('');

  const theme = useTheme();
  const { signUp, signIn } = useAuth();
  const router = useRouter();

  const handleSwitchMode = () => {
    setIsSignUp(prev => !prev);
  };
  const handleAuth = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }
    setError(null);
    if (isSignUp) {
      const error = await signUp(email, password);
      if (error) {
        setError(error);
        return;
      }
    } else {
      const error = await signIn(email, password);
      if (error) {
        setError(error);
        return;
      }
    }
    router.replace('/');
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title} variant="headlineMedium">
          {isSignUp ? 'Create Account' : 'Welcome Back'}
        </Text>
        <TextInput
          label="Email"
          placeholder="Email"
          keyboardType="email-address"
          mode="outlined"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          label="Password"
          placeholder="Password"
          secureTextEntry={true}
          mode="outlined"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
        {error && <Text style={{ color: theme.colors.error }}>{error}</Text>}
        <Button mode="contained" onPress={handleAuth} style={styles.button}>
          {isSignUp ? 'Create Account' : 'Sign in'}
        </Button>
        <Button
          mode="text"
          onPress={handleSwitchMode}
          style={styles.switchModeButton}
        >
          {isSignUp
            ? 'Already have an account? Sign in'
            : "Don't have an account? Sign up"}
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  content: {
    width: '100%',
    maxWidth: 400,
    padding: 16,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
    fontSize: 24,
  },
  input: {
    marginBottom: 16,
    backgroundColor: 'white',
  },
  button: {
    marginTop: 8,
  },
  switchModeButton: {
    marginTop: 16,
  },
});
