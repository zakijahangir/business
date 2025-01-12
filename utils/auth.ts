import AsyncStorage from '@react-native-async-storage/async-storage';
import { clearCache } from './cache';

export async function login(username: string, password: string) {
  // Implement your login logic here
  // If login is successful, store the auth token
  const authToken = 'your-auth-token';
  await AsyncStorage.setItem('authToken', authToken);
}

export async function logout() {
  await AsyncStorage.removeItem('authToken');
  await clearCache();
}

export async function isLoggedIn() {
  const authToken = await AsyncStorage.getItem('authToken');
  return !!authToken;
}

