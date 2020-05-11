import { StoreBase } from 'src/modules/shared/models/store-base';
import { TodoState } from '../models/todo-state.interface';

const state: TodoState = {
    todos: []
};

export class TodoStore extends StoreBase<TodoState> {
  constructor() {
    super(state);
  }
}
