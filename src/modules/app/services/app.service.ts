import { Injectable } from "@angular/core";
import { AppStore } from './app-store';
import { MenuItem } from '../models/menu-item.model';

@Injectable()
export class AppService {
  constructor(private appStore: AppStore) {}

  addDropDownMenuItem(item: MenuItem) {
    const items = this.appStore.get("dropDownMenuItems") || [];
    items.push(item);
    this.appStore.set("dropDownMenuItems", items);
  }
}
