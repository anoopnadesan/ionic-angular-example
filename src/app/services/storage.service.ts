import { Injectable } from '@angular/core';

const storage = sessionStorage;

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  /**
   * @summary Get an item from session storage
   * @param key name in which the data is stored
   * @returns stored data for the parameter
   */
  getItem(key) {
    return storage.getItem(key);
  }

  /**
   * @summary Set an item to session storage
   * @param key name in which the data is stored
   * @param value data to store
   */
  setItem(key, value) {
    storage.setItem(key, value);
  }

  /**
   * @summary Delete an item from session storage
   * @param key name in which the data is stored
   */
  deleteItem(key) {
    storage.removeItem(key);
  }

  /**
   * @summary Clear all data from session storage
   */
  clearDB() {
    storage.clear();
  }
}