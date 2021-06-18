import { makeAutoObservable } from "mobx";

export class UserStore {
  storageValue = "";

  constructor() {
    makeAutoObservable(this);
  }

  setStorageValue(storageValue) {
    this.storageValue = storageValue;
  }
}
