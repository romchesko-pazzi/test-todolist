const initState: BoardType[] = [];

export const BoardsReducer = (
  state = initState,
  action: BoardsActionsType,
): BoardType[] => {
  switch (action.type) {
    case 'boards/create-board':
      return [...state, { ...action.payload.board }];
    case 'boards/set-boards':
      return [...state, ...action.payload.boards];
    default: {
      return state;
    }
  }
};

export const createBoard = (board: BoardType) => {
  return {
    type: 'boards/create-board',
    payload: { board },
  } as const;
};

export const setBoards = (boards: BoardType[]) => {
  return {
    type: 'boards/set-boards',
    payload: { boards },
  } as const;
};

export type CreateBoardType = ReturnType<typeof createBoard>;
export type SetBoardsType = ReturnType<typeof setBoards>;

export type BoardsActionsType = CreateBoardType | SetBoardsType;

type BoardType = {
  title: string;
  boardId: string;
};
