import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_KEY } from '../data/dummyData';
import { saveToken } from './saveToken';

const REFRESH_TOKEN_KEY = '@refresh_token';

export async function saveRefreshToken(token: string): Promise<void> {
  try {
    await AsyncStorage.setItem(REFRESH_TOKEN_KEY, token);
  } catch (error) {
    console.error('Error saving refresh token:', error);
    throw new Error('Failed to save refresh token');
  }
}

export async function getRefreshToken(): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(REFRESH_TOKEN_KEY);
  } catch (error) {
    console.error('Error getting refresh token:', error);
    throw new Error('Failed to get refresh token');
  }
}

export async function removeRefreshToken(): Promise<void> {
  try {
    await AsyncStorage.removeItem(REFRESH_TOKEN_KEY);
  } catch (error) {
    console.error('Error removing refresh token:', error);
    throw new Error('Failed to remove refresh token');
  }
}

export async function refreshAuthToken(): Promise<{ idToken: string; refreshToken: string }> {
  try {
    const refreshToken = await getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await fetch(`https://securetoken.googleapis.com/v1/token?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to refresh token');
    }

    // Save the new tokens
    await saveToken(data.id_token);
    await saveRefreshToken(data.refresh_token);

    return {
      idToken: data.id_token,
      refreshToken: data.refresh_token,
    };
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error;
  }
}
