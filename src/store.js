import { makeAutoObservable } from "mobx";

export class UserStore {
  storageValue = "";
  isLoading = false;
  errorMessage = "";
  darkMode = false;
  constructor() {
    makeAutoObservable(this);
  }

  setStorageValue(storageValue) {
    this.storageValue = storageValue;
  }
  setIsLoading(isLoading) {
    this.isLoading = isLoading;
  }
  setErrorMessage(errorMessage) {
    this.errorMessage = errorMessage;
  }
  setDarkMode(darkMode) {
    this.darkMode = darkMode;
  }
}
