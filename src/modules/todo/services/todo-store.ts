import { StoreBase } from 'src/modules/shared/models/store-base';
import { TodoState } from '../models/todo-state.interface';
import { LocalStorageService } from 'src/modules/shared/services/local-storage.service';

const state: TodoState = {
    todos: []
};

export class TodoStore extends StoreBase<TodoState> {
  constructor(private lsService: LocalStorageService) {
    super(state);
    const todos = lsService.get("todos") || [];
    this.set("todos", todos);
  }
}
