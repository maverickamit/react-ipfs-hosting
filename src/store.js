import { makeAutoObservable } from "mobx";

export class UserStore {
  storageValue = "";
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setStorageValue(storageValue) {
    this.storageValue = storageValue;
  }
  setIsLoading(isLoading) {
    this.isLoading = isLoading;
  }
}
