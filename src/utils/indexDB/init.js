import { appConfig } from "../../config";

const dbPromise = (stores) => () => {
  const dbPromise = window.indexedDB.open("imate-gallery-db", 1);

  return new Promise((resolve, reject) => {
    dbPromise.onupgradeneeded = (event) => {
      const upgradeDb = event.target.result;
      stores.forEach((store) => {
        if (!upgradeDb.objectStoreNames.contains(store.name)) {
          const objectStore = upgradeDb.createObjectStore(store.name, {
            keyPath: store.key,
          });
          store.indices.forEach((index) =>
            objectStore.createIndex(index, index, { unique: true })
          );
        }
      });
    };

    dbPromise.onsuccess = (event) => {
      resolve(event.target.result);
    };

    dbPromise.onerror = (error) => {
      reject(error);
    };
  });
};

export default dbPromise(appConfig.indexDBStores);
