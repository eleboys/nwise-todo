import { StoreBase } from 'src/modules/shared/models/store-base';
import { AppState } from '../models/app-state.interface';

const state: AppState = {
  dropDownMenuItems: []
};

export class AppStore extends StoreBase<AppState> {
  constructor() {
    super(state);
  }
}
