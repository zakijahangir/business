import AsyncStorage from '@react-native-async-storageimport AsyncStorage from '@react-native-async-storage/async-storage';

const CACHE_PREFIX = 'app_cache_';
const CACHE_EXPIRATION = 24 * 60 * 60 * 1000; // 24 hours

export async function cacheData(key: string, data: any) {
  const cacheItem = {
    data,
    timestamp: Date.now(),
  };
  await AsyncStorage.setItem(`${CACHE_PREFIX}${key}`, JSON.stringify(cacheItem));
}

export async function getCachedData(key: string) {
  const cachedItem = await AsyncStorage.getItem(`${CACHE_PREFIX}${key}`);
  if (!cachedItem) return null;

  const { data, timestamp } = JSON.parse(cachedItem);
  if (Date.now() - timestamp > CACHE_EXPIRATION) {
    await AsyncStorage.removeItem(`${CACHE_PREFIX}${key}`);
    return null;
  }

  return data;
}

export async function clearCache() {
  const keys = await AsyncStorage.getAllKeys();
  const cacheKeys = keys.filter(key => key.startsWith(CACHE_PREFIX));
  await AsyncStorage.multiRemove(cacheKeys);
}

