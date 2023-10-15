import dbPromise from "./init";

export const addObject = async (newObject, storeName) => {
  try {
    const indexDB = await dbPromise();
    
    const tx = indexDB.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    
    const request = store.add(newObject);

    return new Promise((resolve, reject) => {
      request.onsuccess = (event) => {
        console.log("Request successful", event.target.result);
        resolve(event.target.result);
      };

      request.onerror = (error) => {
        console.log("Request failed", error);
        reject(error.result);
      };
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteObject = async (objectKey, storeName) => {
  const indexDB = await dbPromise();
  const tx = indexDB.transaction(storeName, "readwrite");
  const store = tx.objectStore(storeName);
  store.delete(objectKey);
  return tx.complete;
};

export const listObjects = async (storeName) => {
  try {
    const indexDB = await dbPromise();
    const tx = indexDB.transaction(storeName, "readonly");
    const store = tx.objectStore(storeName);
    const request = store.getAll();

    return new Promise((resolve, reject) => {
      request.onsuccess = (event) => {
        console.log("Request successful", event.target.result);
        resolve(event.target.result);
      };

      request.onerror = (error) => {
        console.log("Request failed", error);
        reject(error);
      };
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateObject = async (newObject, storeName) => {
    try {
      const indexDB = await dbPromise();
      
      const tx = indexDB.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);
      
      const request = store.update(newObject);
  
      return new Promise((resolve, reject) => {
        request.onsuccess = (event) => {
          console.log("Request successful", event.target.result);
          resolve(event.target.result);
        };
  
        request.onerror = (error) => {
          console.log("Request failed", error);
          reject(error.result);
        };
      });
    } catch (error) {
      console.log(error);
    }
  };
  
export const clearObjects = async (storeName) => {
    try {
      const indexDB = await dbPromise();
      
      const tx = indexDB.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);
      
      const request = store.clear();
  
      return new Promise((resolve, reject) => {
        request.onsuccess = (event) => {
          console.log("Request successful", event.target.result);
          resolve(event.target.result);
        };
  
        request.onerror = (error) => {
          console.log("Request failed", error);
          reject(error.result);
        };
      });
    } catch (error) {
      console.log(error);
    }
  };
  