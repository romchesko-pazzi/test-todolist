const initState: TodolistType[] = [];

export const TodolistReducer = (
  state = initState,
  action: TodolistsActionsType,
): TodolistType[] => {
  switch (action.type) {
    case 'todolist/create-todolist':
      return [...state, { ...action.payload.todolist }];
    case 'todolist/set-todolists':
      return [...state, ...action.payload.todolists];
    default: {
      return state;
    }
  }
};

export const createTodolist = (todolist: TodolistType) => {
  return {
    type: 'todolist/create-todolist',
    payload: { todolist },
  } as const;
};

export const setTodolists = (todolists: TodolistType[]) => {
  return {
    type: 'todolist/set-todolists',
    payload: { todolists },
  } as const;
};

export type CreateTodolistType = ReturnType<typeof createTodolist>;
export type SetTodolistsType = ReturnType<typeof setTodolists>;

export type TodolistsActionsType = CreateTodolistType | SetTodolistsType;

export type TodolistType = {
  title: string;
  todolistId: string;
};
