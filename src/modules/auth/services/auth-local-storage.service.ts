import { Injectable } from '@angular/core';
import { LocalStorageService } from 'src/modules/shared/services/local-storage.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthLocalStorageService {

  constructor(private lsService: LocalStorageService,
              private authService: AuthService) { }

  get(key: string): any {
    key = this.getKeyPrefixed(key);
    return this.lsService.get(key);
  }

  set(key: string, value: any): void {
    key = this.getKeyPrefixed(key);
    this.lsService.set(key, value);
  }

  removeLocal(key: string): void {
    key = this.getKeyPrefixed(key);
    this.lsService.removeLocal(key);
  }

  removeAllLocals(): void {
    const prefix = this.getKeyPrefix();
    for (const key in window.localStorage) {
      if (key.startsWith(prefix) && window.localStorage.hasOwnProperty(key)) {
        this.lsService.removeLocal(key);
      }
    }
  }

  private getKeyPrefix(): string {
    const user = this.authService.getCurrentUser();
    return user ? user.id + "_" : "";
  }

  private getKeyPrefixed(key: string): string {
    return this.getKeyPrefix() + key;
  }
}
