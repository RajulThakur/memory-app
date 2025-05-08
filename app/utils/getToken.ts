import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = '@auth_token';

export async function getToken(): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error('Error getting token:', error);
    throw new Error('Failed to get authentication token');
  }
}

export async function isAuthenticated(): Promise<boolean> {
  try {
    const token = await getToken();
    return token !== null;
  } catch (error) {
    console.error('Error checking authentication:', error);
    return false;
  }
}
