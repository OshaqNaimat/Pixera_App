import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { regUser, LoginUser, Signout, userReset } from './path/to/userSlice';

const AuthScreen = () => {
  const dispatch = useDispatch();
  const { user, userLoading, userError, userMessage, userSuccess } = useSelector(state => state.auth);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Load user from AsyncStorage on mount
  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        // You can dispatch an action to set user if needed
        // e.g., dispatch(setUser(JSON.parse(storedUser)))
      }
    };
    loadUser();
  }, []);

  const handleRegister = () => {
    dispatch(regUser({ name, email, password }));
  };

  const handleLogin = () => {
    dispatch(LoginUser({ email, password }));
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('user');
    dispatch(Signout());
  };

  const handleReset = () => {
    dispatch(userReset());
  };

  return (
    <View style={styles.container}>
      {!user ? (
        <>
          <Text style={styles.title}>Register / Login</Text>
          <TextInput
            style={styles.input}
            placeholder="Name (for Register)"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <Button title={userLoading ? "Loading..." : "Register"} onPress={handleRegister} />
          <View style={{ marginVertical: 5 }} />
          <Button title={userLoading ? "Loading..." : "Login"} onPress={handleLogin} />

          {userError && <Text style={styles.error}>{userMessage}</Text>}
        </>
      ) : (
        <>
          <Text style={styles.success}>Welcome, {user.name || user.email}!</Text>
          <Button title="Logout" onPress={handleLogout} />
          <View style={{ marginVertical: 5 }} />
          <Button title="Reset State" onPress={handleReset} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  title: { fontSize: 22, marginBottom: 10, textAlign: 'center' },
  error: { color: 'red', marginTop: 10 },
  success: { color: 'green', fontSize: 18, marginBottom: 10, textAlign: 'center' },
});

export default AuthScreen;
