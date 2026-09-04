/**
 * Browser stand-in for @react-native-async-storage/async-storage.
 */
const memory = new Map<string, string>();

const AsyncStorage = {
  async getItem(key: string): Promise<string | null> {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(key);
    }
    return memory.get(key) ?? null;
  },

  async setItem(key: string, value: string): Promise<void> {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(key, value);
      return;
    }
    memory.set(key, value);
  },

  async removeItem(key: string): Promise<void> {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(key);
      return;
    }
    memory.delete(key);
  },
};

export default AsyncStorage;
