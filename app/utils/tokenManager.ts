import { API_KEY } from '../data/dummyData';
import { getToken } from './getToken';
import { refreshAuthToken } from './refreshToken';

let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

// Subscribe to token refresh
const subscribeTokenRefresh = (cb: (token: string) => void) => {
  refreshSubscribers.push(cb);
};

// Notify all subscribers with the new token
const onRefreshComplete = (token: string) => {
  refreshSubscribers.forEach(cb => cb(token));
  refreshSubscribers = [];
};

export async function getValidToken(): Promise<string> {
  const token = await getToken();
  if (!token) {
    throw new Error('No token available');
  }

  // Check if token is expired (you might want to decode the JWT and check expiration)
  // For now, we'll just try to refresh if there's an error
  try {
    // Make a test request to verify token
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ idToken: token }),
      }
    );

    if (!response.ok) {
      throw new Error('Token validation failed');
    }

    return token;
  } catch (error) {
    // Token is invalid or expired, try to refresh
    if (!isRefreshing) {
      isRefreshing = true;
      try {
        const { idToken } = await refreshAuthToken();
        isRefreshing = false;
        onRefreshComplete(idToken);
        return idToken;
      } catch (refreshError) {
        isRefreshing = false;
        throw refreshError;
      }
    } else {
      // Another refresh is in progress, wait for it
      return new Promise(resolve => {
        subscribeTokenRefresh(newToken => {
          resolve(newToken);
        });
      });
    }
  }
}
