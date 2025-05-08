import { API_KEY } from '../data/dummyData';
import { getToken } from './getToken';
import { removeToken } from './saveToken';
import { removeRefreshToken } from './refreshToken';

export interface UserData {
  localId: string;
  email: string;
  emailVerified: boolean;
  displayName: string;
  photoUrl?: string;
  lastLoginAt: string;
  createdAt: string;
}

export async function getUserData(): Promise<UserData | null> {
  try {
    const token = await getToken();
    if (!token) {
      return null;
    }

    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken: token }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to get user data');
    }

    return data.users[0];
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
}

export async function logout(): Promise<void> {
  try {
    await removeToken();
    await removeRefreshToken();
  } catch (error) {
    console.error('Error during logout:', error);
    throw error;
  }
}
