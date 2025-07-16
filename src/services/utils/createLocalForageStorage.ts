import type { BuildStorage, StorageValue } from "axios-cache-interceptor";
import localforage from "localforage";

export function createLocalForageStorage(storageName: string): BuildStorage {
  const store = localforage.createInstance({ name: storageName });

  return {
    async find(key): Promise<StorageValue> {
      return (await store.getItem<StorageValue>(key)) ?? { state: "empty" };
    },

    async set(key, value): Promise<void> {
      await store.setItem(key, value);
    },

    async remove(key): Promise<void> {
      await store.removeItem(key);
    },

    async clear(): Promise<void> {
      await store.clear();
    }
  };
}
