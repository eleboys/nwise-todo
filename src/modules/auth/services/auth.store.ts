import { StoreBase } from 'src/modules/shared/models/store-base';
import { AuthState } from '../models/auth-state.interface';

const state: AuthState = {
    currentUser: null,
    isAuthenticated: false
};

export class AuthStore extends StoreBase<AuthState> {
    constructor() {
        super(state);
    }
}
