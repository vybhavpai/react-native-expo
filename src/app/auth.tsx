import { KeyboardAvoidingView, Platform, View, StyleSheet } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import React from 'react';

export default function AuthScreen() {
  const [isSignUp, setIsSignUp] = React.useState<Boolean>(false);
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const handleSwitchMode = () => {
    setIsSignUp(prev => !prev);
  };
  const handleAuth = () => {
    console.log('***LOG*** handleAuth');
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
          keyboardType="visible-password"
          mode="outlined"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
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
