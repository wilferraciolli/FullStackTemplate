import {Injectable} from "@angular/core";
import {STORAGE_PREFIX} from "./storage-known-key.constant";

@Injectable({providedIn: 'root'})
export class StorageService {
  public getFromLocalStorage<T>(key: string): T | null {
    console.log('key to get item ', `${STORAGE_PREFIX}${key}`)
    let value: string | null = localStorage.getItem(`${STORAGE_PREFIX}${key}`);

    if (value) {
      return JSON.parse(value);
    }

    return null;
  }

  public addToLocalStorage<T>(key: string, value: T): void {
    localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(value));
  }

  removeItem(key: string): void {
    localStorage.removeItem(`${STORAGE_PREFIX}${key}`);
  }
}
